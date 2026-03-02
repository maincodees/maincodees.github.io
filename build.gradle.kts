plugins {
    base
}

tasks.register("verifyAndroidScaffold") {
    group = "verification"
    description = "Verifies Android scaffold files exist in offline CI environments."

    val requiredFiles = listOf(
        "app/build.gradle.kts",
        "app/src/main/AndroidManifest.xml",
        "app/src/main/java/com/maincodees/androidapp/MainActivity.kt",
        "app/src/main/java/com/maincodees/androidapp/MainApplication.kt",
        "app/src/main/java/com/maincodees/androidapp/presentation/login/LoginScreen.kt",
        "app/src/main/java/com/maincodees/androidapp/presentation/login/LoginViewModel.kt",
        "app/src/main/java/com/maincodees/androidapp/di/AppModule.kt"
    )

    doLast {
        val missing = requiredFiles.filterNot { file(it).exists() }
        check(missing.isEmpty()) {
            "Missing required Android scaffold files: ${missing.joinToString()}"
        }
    }
}

tasks.named("check") {
    dependsOn("verifyAndroidScaffold")
}
