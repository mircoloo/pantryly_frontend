import { tabs } from "@/constants/data";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import clsx from "clsx";
import type { ImageSource } from "expo-image";
import { View } from "react-native";

type TabIconProps = {
  focused: boolean;
  icon: ImageSource;
};

const TabLayout = () => {
  const TabIcon = ({ focused, icon }: TabIconProps) => (
    <View className="tabs-icon">
      <View className={clsx("icon-pill", focused && "tabs-active")}>
        <Image source={icon} className="tabs-glyph" />
      </View>
    </View>
  );

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
