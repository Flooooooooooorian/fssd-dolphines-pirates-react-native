import { NativeTabs } from "expo-router/native-tabs";

export default function GalleryLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="Gallery">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="Create" />
    </NativeTabs>
  );
}
