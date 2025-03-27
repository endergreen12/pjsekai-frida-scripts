import { AssemblyImage, DebugClass } from './lib/consts.js'

Il2Cpp.perform(() => {
    // Enable logging
    DebugClass.method<boolean>("IsLoggingEnabled").implementation = function()
    {
        return true
    }

    // Hook log functions
    DebugClass.method("Log").overload("System.Object").implementation = function(message: Il2Cpp.Object)
    {
        console.log(message)
    }

    DebugClass.method("Log").overload("System.Object", "UnityEngine.Object").implementation = function(message: Il2Cpp.Object, context: Il2Cpp.Object)
    {
        console.log(`${message}\ncontext: ${context}`)
    }

    DebugClass.method("LogAssertion").implementation = function(message)
    {
        console.log(message)
    }

    DebugClass.method("LogAssertionFormat").implementation = function(format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\nargs: ${args}`)
    }

    DebugClass.method("LogError").overload("System.Object").implementation = function(message: Il2Cpp.Object)
    {
        console.log(message)
    }

    DebugClass.method("LogError").overload("System.Object", "UnityEngine.Object").implementation = function(message: Il2Cpp.Object, context: Il2Cpp.Object)
    {
        console.log(`${message}\ncontext: ${context}`)
    }

    DebugClass.method("LogErrorFormat").overload("System.String", "System.Object[]").implementation = function(format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\nargs: ${args}`)
    }

    DebugClass.method("LogErrorFormat").overload("UnityEngine.Object", "System.String", "System.Object[]").implementation = function(context: Il2Cpp.Object, format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\ncontext: ${context}\nargs: ${args}`)
    }

    DebugClass.method("LogException").overload("System.Exception").implementation = function(exception: Il2Cpp.Object)
    {
        console.log(exception)
    }

    DebugClass.method("LogException").overload("System.Exception", "UnityEngine.Object").implementation = function(exception: Il2Cpp.Object, context: Il2Cpp.Object)
    {
        console.log(`${exception}\ncontext: ${context}`)
    }

    DebugClass.method("LogFormat").implementation = function(format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\nargs: ${args}`)
    }

    DebugClass.method("LogWarning").overload("System.Object").implementation = function(message: Il2Cpp.Object)
    {
        console.log(message)
    }

    DebugClass.method("LogWarning").overload("System.Object", "UnityEngine.Object").implementation = function(message: Il2Cpp.Object, context: Il2Cpp.Object)
    {
        console.log(`${message}\ncontext: ${context}`)
    }

    DebugClass.method("LogWarningFormat").overload("System.String", "System.Object[]").implementation = function(format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\nargs: ${args}`)
    }

    DebugClass.method("LogWarningFormat").overload("UnityEngine.Object", "System.String", "System.Object[]").implementation = function(context: Il2Cpp.Object, format: Il2Cpp.String, args: Il2Cpp.Array)
    {
        console.log(`${format}\ncontext: ${context}\nargs: ${args}`)
    }

    // AssetBundle logging
    AssemblyImage.class("Sekai.AssetBundleLoader").method("LoadAssetBundle").overload("System.String").implementation = function(bundleName: Il2Cpp.String)
    {
        this.method("LoadAssetBundle").overload("System.String").invoke(bundleName)
        console.log(`[AssetBundle] ${bundleName} loaded`)
    }

    AssemblyImage.class("Sekai.AssetBundleLoader").method<Il2Cpp.Object>("LoadAssetBundle").overload("System.String", "System.String").implementation = function(bundleName: Il2Cpp.String, fileName: Il2Cpp.String)
    {
        const assetBundle = this.method<Il2Cpp.Object>("LoadAssetBundle").overload("System.String", "System.String").invoke(bundleName)
        console.log(`[AssetBundle] ${bundleName} loaded\nfilename: ${fileName}`)
        return assetBundle
    }

    AssemblyImage.class("Sekai.AssetBundleLoader").method("LoadAssetBundleAsync").implementation = function(bundleName: Il2Cpp.String, mb: Il2Cpp.Object, onFinish: Il2Cpp.Object, readBufferSize: number)
    {
        this.method("LoadAssetBundleAsync").invoke(bundleName, mb, onFinish, readBufferSize)
        console.log(`[AssetBundle] ${bundleName} is being loaded asynchronously`)
    }
})