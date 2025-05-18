import { AssemblyImage, DebugClass } from './lib/consts'

Il2Cpp.perform(() => {
    // Enable logging
    DebugClass.method<boolean>("IsLoggingEnabled").implementation = function()
    {
        return true
    }

    Il2Cpp.trace(true).classes(DebugClass).filterMethods(method => method.name.startsWith("Log")).and().attach()
    Il2Cpp.trace(true).classes(AssemblyImage.class("Sekai.AssetBundleLoader")).filterMethods(method => method.name.startsWith("Load")).and().attach()
})