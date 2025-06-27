import { CoreModuleImage } from './lib/consts.js'

Il2Cpp.perform(() => {
    Il2Cpp.trace(true).classes(CoreModuleImage.class("UnityEngine.Debug")).filterMethods(method => method.name.startsWith("Log")).and().attach()
})