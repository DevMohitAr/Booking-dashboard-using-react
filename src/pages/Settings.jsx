import React from "react";
import { useSettings } from "../hooks/settings/useSettings";
import { SettingForm } from "../ui/SettingForm";
export default function Settings() {
  const { data: settings } = useSettings();
  return (
    <>
      {settings?.map((setting) => {
        return <SettingForm key={setting.id} setting={setting} />;
      })}
    </>
  );
}
