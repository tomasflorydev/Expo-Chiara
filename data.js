// Game content and narrative data for "¡Se busca Dev!"
// Edit any text here to customize dialogues, options, or explanations.
// Uses a global variable (GAME_DATA) so the game works via double-click (file://) without ES modules or a server.

window.GAME_DATA = {
  title: "¡Se busca Dev!",
  subtitle: "Aventura interactiva de selección de personal",
  companyName: "OfiTech S.A.",
  intro: {
    badge: "Exposición de Psicología · Proceso de Selección",
    headline: "Lunes 9:00 AM en OfiTech S.A.",
    description:
      "Sos el/la psicólogo/a reclutador/a de la empresa. Arrancás la semana con un café tranquilo... hasta que entra Camila con una caja de cartón y Matías empieza a transpirar.",
    hint: "En clase: voten entre todos y elegí con click o con las teclas 1 y 2.",
    startButton: "Arrancar la semana"
  },

  characters: {
    recruiter: {
      name: "Vos (RRHH)",
      role: "Psicólogo/a reclutador/a"
    },
    camila: {
      name: "Camila",
      role: "Dev Backend"
    },
    matias: {
      name: "Matías",
      role: "Jefe apurado"
    },
    gonzalo: {
      name: "Gonzalo",
      role: "Candidato"
    }
  },

  phases: [
    {
      id: 1,
      shortTitle: "Renuncia",
      title: "Fase 1 · La renuncia",
      sceneTheme: "office-desk",
      actors: [
        {
          id: "camila",
          expression: "happy",
          animation: "wave",
          hasBox: true
        },
        {
          id: "matias",
          expression: "surprised",
          animation: "shake"
        },
        {
          id: "recruiter",
          expression: "worried",
          animation: "none"
        }
      ],
      dialogues: [
        {
          speaker: "camila",
          text: "¡Che, les aviso que renuncio! Me reclutó la UADE y arranco la semana que viene. Ya armé mi cajita."
        },
        {
          speaker: "matias",
          text: "¡¿CÓMO QUE RENUNCIÁS?! ¡Se me cae el sistema! Che, RRHH, decidí ya qué hacemos antes de que me agarre algo."
        }
      ],
      prompt: "¿Cuál es tu primera decisión?",
      options: [
        {
          label: "Identificar la vacante y relevar el perfil",
          correct: true,
          success: {
            title: "¡Bien ahí! Primero, orden.",
            actors: [
              { id: "recruiter", expression: "happy", animation: "bounce" },
              { id: "camila", expression: "happy", animation: "none", hasBox: true },
              { id: "matias", expression: "normal", animation: "none" }
            ],
            dialogues: [
              {
                speaker: "recruiter",
                text: "Pará un segundo, Matías. Antes de salir corriendo, anotemos bien qué hacía Camila y qué necesita el puesto."
              },
              {
                speaker: "camila",
                text: "Dale, les dejo todo prolijo antes de irme. ¡Éxitos buscando a mi reemplazo!"
              }
            ],
            note: "Relevar el perfil te permite saber exactamente qué tareas, conocimientos y experiencia necesita la persona que vas a buscar."
          }
        },
        {
          label: "Dividir sus tareas entre el resto del equipo",
          correct: false,
          gameOver: {
            title: "GAME OVER · Viernes 18:00 hs",
            actors: [
              { id: "matias", expression: "disaster", animation: "shake" },
              { id: "recruiter", expression: "disaster", animation: "shake" }
            ],
            story:
              "El equipo colapsó en tres días: nadie entendía el código de Camila. Matías armó una reunión de 4 horas para 'ordenar prioridades' y el servidor se cayó justo un viernes a las 18 hs.",
            explanation:
              "¿Por qué salió mal? Repartir un puesto entero entre gente que ya tiene sus tareas sobrecarga al equipo y no resuelve la falta de alguien que sepa hacer ese trabajo."
          }
        }
      ]
    },

    {
      id: 2,
      shortTitle: "Vacante",
      title: "Fase 2 · Vacante identificada",
      sceneTheme: "office-board",
      actors: [
        {
          id: "recruiter",
          expression: "normal",
          animation: "bounce"
        },
        {
          id: "matias",
          expression: "worried",
          animation: "shake"
        }
      ],
      dialogues: [
        {
          speaker: "recruiter",
          text: "Listo, ya tenemos claro el perfil de desarrollador/a backend que necesita el equipo."
        },
        {
          speaker: "matias",
          text: "¡Buenísimo! Pero lo necesito para ayer, che. ¿Salimos a buscar afuera o vemos si alguien de acá se copa?"
        }
      ],
      prompt: "¿Cómo salís a buscar al reemplazo?",
      options: [
        {
          label: "Elaborar una publicación en LinkedIn",
          correct: true,
          success: {
            title: "¡Afuera a buscar talento!",
            actors: [
              { id: "recruiter", expression: "happy", animation: "bounce" },
              { id: "matias", expression: "normal", animation: "none" }
            ],
            dialogues: [
              {
                speaker: "recruiter",
                text: "Armamos una publicación clara en LinkedIn con las tareas y requisitos reales del puesto. Así llegamos a gente del rubro."
              },
              {
                speaker: "matias",
                text: "Dale, dale, publicalo ya que quiero ver candidatos."
              }
            ],
            note: "Publicar en LinkedIn permite llegar rápido a personas que realmente tienen la experiencia técnica que el puesto pide."
          }
        },
        {
          label: "Realizar una búsqueda interna",
          correct: false,
          gameOver: {
            title: "GAME OVER · Guerra en el grupo de WhatsApp",
            actors: [
              { id: "matias", expression: "disaster", animation: "shake" },
              { id: "recruiter", expression: "disaster", animation: "none" }
            ],
            story:
              "Los empleados se pelearon por el puesto, el grupo de WhatsApp de la oficina se volvió un campo de batalla y el de contabilidad insistió con que 'sabe usar Excel, así que programa'.",
            explanation:
              "¿Por qué salió mal? Una búsqueda interna solo sirve si ya hay alguien en la empresa con la formación para el puesto; si no, generás roces y seguís sin cubrir la necesidad."
          }
        }
      ]
    },

    {
      id: 3,
      shortTitle: "Publicación",
      title: "Fase 3 · ¡Se publicó el aviso!",
      sceneTheme: "office-inbox",
      isTransition: true,
      actors: [
        {
          id: "recruiter",
          expression: "surprised",
          animation: "shake"
        },
        {
          id: "matias",
          expression: "happy",
          animation: "bounce"
        }
      ],
      dialogues: [
        {
          speaker: "recruiter",
          text: "Subimos el aviso hace menos de 24 horas y explotó la bandeja de entrada: ¡llegaron 342 CVs!"
        },
        {
          speaker: "matias",
          text: "¡Qué éxito! Che, ¿entonces ya tenemos programador? Decime que arranca mañana."
        }
      ],
      specialCard: {
        type: "funny-cv",
        badge: "Bandeja de entrada · 342 sin leer",
        title: "CV #142 — Postulante entusiasta",
        lines: [
          "Experiencia en programación: Ninguna, pero vi tres TikToks y re entiendo.",
          "Habilidades destacadas: Cebo unos mates tremendos y traigo facturas los viernes.",
          "Disponibilidad: Inmediata (si hay aire acondicionado)."
        ]
      },
      continueLabel: "Continuar al filtrado"
    },

    {
      id: 4,
      shortTitle: "Filtrado",
      title: "Fase 4 · Filtrado de CVs",
      sceneTheme: "office-inbox",
      actors: [
        {
          id: "recruiter",
          expression: "worried",
          animation: "none"
        },
        {
          id: "matias",
          expression: "worried",
          animation: "shake"
        }
      ],
      dialogues: [
        {
          speaker: "recruiter",
          text: "Tenemos 342 currículums para revisar y Matías me mira fijo desde la puerta cada diez minutos."
        },
        {
          speaker: "matias",
          text: "Che, no es por apurar, pero... ¿ya filtraste eso? ¿Cómo los vas a revisar?"
        }
      ],
      prompt: "¿Qué método usás para filtrar los CVs?",
      options: [
        {
          label: "Filtrado con IA",
          correct: true,
          success: {
            title: "¡Tiempo salvado!",
            actors: [
              { id: "recruiter", expression: "happy", animation: "bounce" },
              { id: "matias", expression: "happy", animation: "none" }
            ],
            dialogues: [
              {
                speaker: "recruiter",
                text: "Usando palabras clave del puesto, la IA filtra los CVs en minutos y nos deja a los candidatos que sí cumplen los requisitos."
              },
              {
                speaker: "matias",
                text: "¡Mirá qué práctico! Al fin una buena noticia."
              }
            ],
            note: "El filtrado con IA mediante palabras clave permite optimizar el tiempo: para un puesto de programador llegan demasiados currículums como para leerlos todos a mano."
          }
        },
        {
          label: "Filtrado manual por RRHH",
          correct: false,
          gameOver: {
            title: "GAME OVER · 3:00 AM y CV #47",
            actors: [
              { id: "recruiter", expression: "disaster", animation: "shake" },
              { id: "matias", expression: "worried", animation: "none" }
            ],
            story:
              "El resto de RRHH renunció al ver la montaña de CVs. Quedaste solo/a en la oficina a las 3 de la mañana leyendo el CV número 47, con cinco cafés encima y viendo doble.",
            explanation:
              "¿Por qué salió mal? Revisar cientos de CVs uno por uno lleva demasiado tiempo y agota al equipo; para puestos con tantas postulaciones se necesita una herramienta que filtre primero."
          }
        }
      ]
    },

    {
      id: 5,
      shortTitle: "Entrevistas",
      title: "Fase 5 · Entrevistas y técnicas",
      sceneTheme: "office-meeting",
      actors: [
        {
          id: "recruiter",
          expression: "normal",
          animation: "none"
        },
        {
          id: "gonzalo",
          expression: "happy",
          animation: "wave"
        },
        {
          id: "matias",
          expression: "worried",
          animation: "shake"
        }
      ],
      dialogues: [
        {
          speaker: "gonzalo",
          text: "¡Hola! Soy Gonzalo, vengo a la entrevista para el puesto de desarrollador backend."
        },
        {
          speaker: "matias",
          text: "Che, metamos a todos los candidatos juntos en la sala de reuniones así liquidamos esto en media hora, ¿dale?"
        }
      ],
      prompt: "¿Cómo organizás las entrevistas?",
      options: [
        {
          label: "Entrevistas grupales",
          correct: false,
          gameOver: {
            title: "GAME OVER · Gran Hermano OfiTech",
            actors: [
              { id: "matias", expression: "disaster", animation: "shake" },
              { id: "gonzalo", expression: "surprised", animation: "shake" },
              { id: "recruiter", expression: "disaster", animation: "none" }
            ],
            story:
              "Los candidatos empezaron a competir entre sí: uno sacó un PowerPoint sorpresa para ganar, otro se puso a discutir con Matías y todo terminó como Gran Hermano. Imposible evaluar a nadie.",
            explanation:
              "¿Por qué salió mal? Juntar a todos en una entrevista grupal para este puesto genera competencia y ruido, y no te deja conocer bien cómo trabaja y responde cada persona."
          }
        },
        {
          label: "Entrevistas individuales",
          correct: true,
          success: {
            title: "¡Entrevista 1 a 1 + técnicas aplicadas!",
            actors: [
              { id: "recruiter", expression: "happy", animation: "bounce" },
              { id: "gonzalo", expression: "happy", animation: "bounce" }
            ],
            dialogues: [
              {
                speaker: "recruiter",
                text: "Entrevistamos a cada finalista por separado, con tiempo y tranquilidad. ¡Gonzalo contó ejemplos re claros de su laburo!"
              },
              {
                speaker: "gonzalo",
                text: "Me sentí súper cómodo, gracias por el espacio para contar cómo trabajo."
              }
            ],
            specialCard: {
              type: "techniques",
              badge: "Herramientas aplicadas en esta fase",
              items: [
                {
                  name: "Método STAR",
                  desc: "Preguntas sobre Situación, Tarea, Acción y Resultado para conocer cómo resolvió problemas reales."
                },
                {
                  name: "Test de las dos personas",
                  desc: "Técnica gráfica administrada de forma individual durante la evaluación."
                },
                {
                  name: "Test de Bender",
                  desc: "Técnica administrada en la instancia individual para complementar la entrevista."
                }
              ]
            }
          }
        }
      ]
    },

    {
      id: 6,
      shortTitle: "Resultados",
      title: "Fase 6 · Análisis y decisión",
      sceneTheme: "office-board",
      actors: [
        {
          id: "recruiter",
          expression: "normal",
          animation: "none"
        },
        {
          id: "gonzalo",
          expression: "normal",
          animation: "none"
        },
        {
          id: "matias",
          expression: "happy",
          animation: "bounce"
        }
      ],
      dialogues: [
        {
          speaker: "recruiter",
          text: "Ya tenemos las notas de las entrevistas y las técnicas de los tres finalistas: Gonzalo, Lucas y Martín."
        },
        {
          speaker: "matias",
          text: "Che, mirá la foto de Lucas, ¡es fachero y queda bárbaro en la página de la empresa! Contratémoslo a él y listo."
        }
      ],
      prompt: "¿Cómo tomás la decisión final?",
      options: [
        {
          label: "Analizar los resultados por competencias",
          correct: true,
          success: {
            title: "¡Decisión basada en resultados!",
            actors: [
              { id: "recruiter", expression: "happy", animation: "bounce" },
              { id: "gonzalo", expression: "happy", animation: "wave" }
            ],
            dialogues: [
              {
                speaker: "recruiter",
                text: "Comparando las 4 competencias clave entre los tres finalistas, Gonzalo es el más sólido en el conjunto. ¡Tenemos elegido!"
              }
            ],
            specialCard: {
              type: "competencies",
              badge: "Comparación de finalistas · 4 competencias",
              competencies: [
                "Planificación",
                "Gestión del tiempo",
                "Resolución de problemas",
                "Proactividad"
              ],
              candidates: [
                {
                  name: "Gonzalo",
                  winner: true,
                  scores: [92, 88, 95, 90]
                },
                {
                  name: "Martín",
                  winner: false,
                  scores: [78, 72, 80, 68]
                },
                {
                  name: "Lucas",
                  winner: false,
                  scores: [55, 60, 48, 65]
                }
              ]
            }
          }
        },
        {
          label: "Contratar a un candidato porque era lindo",
          correct: false,
          gameOver: {
            title: "GAME OVER · 'Arreglame el wifi'",
            actors: [
              { id: "matias", expression: "disaster", animation: "shake" },
              { id: "recruiter", expression: "disaster", animation: "shake" }
            ],
            story:
              "Lucas sonreía divino en todas las videollamadas, pero no sabía programar ni una línea. Matías lo mandó a 'arreglar el wifi' y terminó desenchufando la heladera de la cocina.",
            explanation:
              "¿Por qué salió mal? Elegir a alguien por apariencia en vez de mirar los resultados y si sabe hacer el trabajo termina en una mala contratación y te obliga a empezar de cero."
          }
        }
      ]
    },

    {
      id: 7,
      shortTitle: "Admisión",
      title: "Fase 7 · Primer día de Gonzalo",
      sceneTheme: "office-desk",
      actors: [
        {
          id: "gonzalo",
          expression: "happy",
          animation: "wave"
        },
        {
          id: "recruiter",
          expression: "happy",
          animation: "none"
        },
        {
          id: "matias",
          expression: "worried",
          animation: "shake"
        }
      ],
      dialogues: [
        {
          speaker: "gonzalo",
          text: "¡Buen día! Qué alegría arrancar hoy en OfiTech. ¿Por dónde empezamos?"
        },
        {
          speaker: "matias",
          text: "Dale una compu, decile que el código está por ahí y que arranque ya mismo, que estamos atrasados."
        }
      ],
      prompt: "¿Qué hacés en el ingreso de Gonzalo?",
      options: [
        {
          label: "Realizar la inducción",
          correct: true,
          isVictory: true
        },
        {
          label: "No realizar inducción",
          correct: false,
          gameOver: {
            title: "GAME OVER · ¿Quién es ese pibe?",
            actors: [
              { id: "gonzalo", expression: "disaster", animation: "shake" },
              { id: "matias", expression: "angry", animation: "shake" }
            ],
            story:
              "Gonzalo dio vueltas perdido por toda la oficina, nadie sabía quién era y terminó sentado en el escritorio de Matías tomando de su taza favorita. Seguridad casi lo acompaña a la puerta.",
            explanation:
              "¿Por qué salió mal? Sin inducción, la persona nueva no sabe cómo funciona la empresa, con quién trabaja ni qué se espera de ella, y arranca confundida y desmotivada."
          }
        }
      ]
    }
  ],

  victory: {
    badge: "¡Misión cumplida!",
    title: "¡Proceso de selección exitoso!",
    actors: [
      { id: "recruiter", expression: "happy", animation: "bounce" },
      { id: "gonzalo", expression: "happy", animation: "wave" },
      { id: "matias", expression: "happy", animation: "bounce" }
    ],
    dialogues: [
      {
        speaker: "gonzalo",
        text: "¡Gracias por la bienvenida! Ya conocí al equipo, charlé con Matías y —lo más importante— ya sé dónde está la cafetera."
      },
      {
        speaker: "matias",
        text: "Che, te reconozco algo: tenías razón en hacer todo prolijo. ¡El sistema vuela y hoy nos vamos a horario!"
      }
    ],
    summaryTitle: "Resumen de las 7 fases del proceso",
    summarySteps: [
      { num: 1, title: "Renuncia", desc: "Identificamos la vacante y relevamos el perfil." },
      { num: 2, title: "Vacante", desc: "Elaboramos la publicación en LinkedIn." },
      { num: 3, title: "Publicación", desc: "Recibimos cientos de postulaciones." },
      { num: 4, title: "Filtrado", desc: "Usamos filtrado con IA por palabras clave." },
      { num: 5, title: "Entrevistas", desc: "Entrevista individual (método STAR) + test de las dos personas y test de Bender." },
      { num: 6, title: "Resultados", desc: "Comparamos planificación, gestión del tiempo, resolución de problemas y proactividad." },
      { num: 7, title: "Admisión", desc: "Realizamos la inducción y Gonzalo se integró al equipo." }
    ],
    replayButton: "Jugar de nuevo"
  }
};
