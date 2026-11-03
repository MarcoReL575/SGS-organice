import { db } from "..";
import { authService } from "../features/auth/service/authService";
import { auth } from "../lib/auth";

async function seedAdmin() {
  try {
    // Verificar si ya existe un admin
    const { success, message } = await authService.existAdmin();

    if (success) {
      console.log("Ya existe un usuario administrador");
      process.exit(0);
    }

    // Crear el usuario admin usando Better Auth
    const admin = await auth.api.signUpEmail({
        body: {
            name: "Administrador",
            email: "admin@empresa.com",
            password: "1234567890",
            role: "admin", // Better Auth permite pasar campos personalizados
        },
    });

    console.log("✅ Usuario administrador creado exitosamente:");
    console.log(`Email: admin@empresa.com`);
    console.log(`Contraseña: 1234567890`);
    console.log("\n⚠️  IMPORTANTE: Cambia la contraseña después del primer login");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear el administrador:", error);
    process.exit(1);
  }
}

seedAdmin();