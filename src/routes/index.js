// Este archivo actúa como un "índice centralizado" para exportar todos los componentes de páginas de tu aplicación.
// Gracias a esto, puedes importar varios componentes desde una sola ruta, lo que mejora la organización y limpieza del código.

// Exporta el componente Login desde el archivo './Login'
export { default as Login } from './Login';

// Exporta el componente NewPassword desde './NewPassword'
export { default as NewPassword } from './NewPassword';

// Exporta el componente Pruebas desde './Pruebas'
export { default as Pruebas } from './Pruebas';

// Exporta el componente Recover (recuperación de contraseña) desde './Recover'
export { default as Recover } from './Recover';

// Exporta el componente Dashboard (tablero principal) desde './Dashboard'
export { default as Dashboard } from './Dashboard';

// Exporta el componente Profile (perfil de usuario) desde './Profile'
export { default as Profile } from './Profile';

// Exporta el componente Reportes (reportes o informes) desde './Reportes'
export { default as Reportes } from './Reportes';

// Exporta el componente RegistrarProfesor (registro de docentes) desde './RegistrarProfesor'
export { default as RegistrarProfesor } from './RegistrarProfesor';

// Exporta el componente Grupos desde su subcarpeta './Grupos/GruposAdmin' (vista de administrador)
export { default as Grupos } from './Grupos/GruposAdmin';

// Exporta el componente Cursos desde './Cursos'
export { default as Cursos } from './Cursos';

// Exporta el componente GruposHistoricos (grupos antiguos o cerrados) desde './GruposHistoricos'
export { default as GruposHistoricos } from './GruposHistoricos';

// Exporta el componente GruposDocente desde './Grupos/GruposProfe/GruposCard' (vista de grupos del docente)
export { default as GruposDocente } from './Grupos/GruposProfe/GruposCard';

// Exporta el componente GruposDocentesNivel desde './Grupos/GruposProfe/GroupsAssigned' (grupos asignados por nivel)
export { default as GruposDocentesNivel } from './Grupos/GruposProfe/GroupsAssigned';

// Exporta el componente MaterialApoyo (material de apoyo educativo) desde './MaterialApoyo'
export { default as MaterialApoyo } from './MaterialApoyo';

// Exporta el componente HomePage (Pagina de bienvenida) desde './HomePage'
export { default as HomePage } from './HomePage';
