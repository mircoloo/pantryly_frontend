import { useAuth } from '@/context/auth-context';
import { usePantry } from '@/context/pantry-context';
import { ProductItem } from '@/types/product';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);
  const { upsertFromScan } = usePantry();
  const { token, authFetch } = useAuth();

  const statusText = useMemo(() => {
    if (isLoading) return 'Saving product...';
    if (product) return 'Product found';
    if (error) return 'No product found';
    return 'Point your camera at a barcode';
  }, [isLoading, product, error]);

  const saveProductByBarcode = async (barcode: string) => {
    setIsLoading(true);
    setError(null);
    setProduct(null);

    try {
      if (!token) {
        throw new Error('You must log in before scanning products.');
      }

      const response = await authFetch('http://localhost:8080/api/v1/products', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Milk',
          barcode,
          expiration_date: '2026-05-23',
        }),
      });

      if (!response.ok) {
        throw new Error('Product save failed');
      }

      const data = await response.json();
      const savedProduct = upsertFromScan({
        code: barcode,
        name: data?.name || 'Milk',
        brand: data?.brand || 'Saved product',
      });

      setProduct(savedProduct);
      router.push(`/product/${encodeURIComponent(savedProduct.code)}`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save product.');
    } finally {
      setIsLoading(false);
    }
  };

  const onBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (!isScanningEnabled || isLoading || !result?.data) {
      return;
    }

    if (result.data === lastBarcode) {
      return;
    }

    setIsScanningEnabled(false);
    setLastBarcode(result.data);
    await saveProductByBarcode(result.data);
  };

  const onScanAgain = () => {
    setError(null);
    setProduct(null);
    setIsScanningEnabled(true);
  };

  if (!permission) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator />
        <Text style={styles.subtleText}>Checking camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>Camera access required</Text>
        <Text style={styles.subtleText}>
          Allow camera access so Pantryly can scan product barcodes.
        </Text>
        <Pressable style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryButtonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Scan Product</Text>
      <Text style={styles.subtleText}>{statusText}</Text>

      <View style={styles.cameraFrame}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39', 'qr'],
          }}
          onBarcodeScanned={isScanningEnabled ? onBarcodeScanned : undefined}
        />
      </View>

      {isLoading && (
        <View style={styles.resultCard}>
          <ActivityIndicator />
          <Text style={styles.cardText}>Saving product...</Text>
        </View>
      )}

      {product && (
        <View style={styles.resultCard}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardText}>Brand: {product.brand}</Text>
          <Text style={styles.cardText}>Barcode: {product.code}</Text>
        </View>
      )}

      {error && (
        <View style={styles.resultCard}>
          <Text style={styles.errorText}>{error}</Text>
          {lastBarcode ? <Text style={styles.cardText}>Barcode: {lastBarcode}</Text> : null}
        </View>
      )}

      <Pressable style={styles.primaryButton} onPress={onScanAgain}>
        <Text style={styles.primaryButtonText}>Scan again</Text>
      </Pressable>

      <Pressable
        style={[styles.primaryButton, styles.secondaryButton]}
        onPress={() => {
          router.push(token ? '/pantry' : '/login');
        }}>
        <Text style={styles.primaryButtonText}>{token ? 'Open pantry list' : 'Login to pantry'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 24,
    gap: 12,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  subtleText: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
  cameraFrame: {
    height: 340,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#1E293B',
    backgroundColor: '#020617',
  },
  resultCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    gap: 4,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  cardText: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2563EB',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
});
