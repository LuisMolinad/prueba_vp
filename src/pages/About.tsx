export function About() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Acerca de esta base</h1>

      <div className="space-y-3 text-slate-700 dark:text-slate-300">
        <p>
          Este proyecto esta pensado como punto de partida para apps que consumen
          endpoints con estructura variable.
        </p>
        <p>
          La validacion del formulario no depende de la respuesta del endpoint. Puedes
          definir reglas directamente en frontend y mantenerlas versionadas junto al codigo.
        </p>
        <p>
          Ya incluye: React + TypeScript, Tailwind, enrutado, tema dark/light persistente y
          formulario con Zod + React Hook Form.
        </p>
      </div>
    </section>
  )
}
        
