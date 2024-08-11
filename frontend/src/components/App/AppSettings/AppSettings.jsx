import React from "react"
import LightSwitch from "../../../UI/LightSwitch/LightSwitch"
import LanguageSelect from "../../../language/LanguageSelect"
import { useTranslation } from "react-i18next"

function AppSettings() {
  const { t } = useTranslation()
  return (
    <>
      <div className='commun-settings'>

        <LanguageSelect />
      </div>
      <hr />
    </>
  )
}

export default AppSettings
