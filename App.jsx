import { useState, useRef, useEffect } from "react";

const GOLD = "#C9A84C";
const DARK = "#1A1A1A";
const WHITE = "#FFFFFF";
const LGRAY = "#F8F8F6";
const MGRAY = "#666666";

const NIVELES = [
  { n:1, emoji:"🧠", title:"Discernimiento", color:"#7B68EE" },
  { n:2, emoji:"🎯", title:"Accountability", color:GOLD },
  { n:3, emoji:"👑", title:"Liderazgo", color:"#E8834A" },
  { n:4, emoji:"🤝", title:"Servicio", color:"#4CAF82" },
  { n:5, emoji:"🗣", title:"Comunicación", color:"#5BA4CF" },
  { n:6, emoji:"❤️", title:"Inteligencia\nEmocional", color:"#E87B8A" },
  { n:7, emoji:"📅", title:"Hábitos", color:"#A8C44C" },
  { n:8, emoji:"🌱", title:"Cultura", color:"#4CB8C4" },
  { n:9, emoji:"🚀", title:"Desarrollo\nProfesional", color:"#B4A4E8" },
  { n:10, emoji:"⛩", title:"Proverbios\nJaponeses", color:"#C4844C" },
];

const FORMATOS = [
  { icon:"📚", title:"Libros", desc:"Ideas que forman y transforman." },
  { icon:"🎧", title:"Audiolibros", desc:"Escucha donde quieras." },
  { icon:"▶️", title:"Series de Video", desc:"Aprendizaje práctico en videos cortos." },
  { icon:"🎙", title:"Podcast", desc:"Historias reales e ideas aplicables.", badge:"Spotify" },
  { icon:"🎤", title:"Conferencias", desc:"Charlas magistrales que inspiran y generan impacto." },
  { icon:"👥", title:"Talleres", desc:"Formación práctica para equipos y líderes." },
  { icon:"🤖", title:"Mentor IA", desc:"Tu coach personal disponible 24/7." },
];

const LIBROS = [
  {
    title:"De Aplastado a Indispensable",
    sub:"El liderazgo operativo que transforma equipos y resultados",
    bg:"#F5F0E0", accent:GOLD,
    img:"./LIBRO1DEAPLASTADOAINDISPENSABLE.jpeg",
    url:"https://a.co/d/03F6mFfZ"
  },
  {
    title:"Lidera desde Quien Eres",
    sub:"De gerente a líder que transforma personas",
    bg:DARK, accent:GOLD,
    img:"./LIBRO2LIDERADESDEQUIENERES.jpeg",
    url:"https://a.co/d/08QyzVQJ"
  },
  {
    title:"Lo Que Nadie Te Enseña Sobre Tu Jefe",
    sub:"Manejar hacia arriba",
    bg:"#2A1A1A", accent:"#CC3333",
    img:"./LIBRO3LOQUENADIETEENSEÑADETUJEFE.jpeg",
    url:"https://a.co/d/06xrjTDI"
  },
];

const CONFERENCIAS = [
  "De Invisible a Influyente","De Oruga a Mariposa","Mentalidad de Servicio",
  "Verde y Limpio","Respeto: Nada es Personal","Pequeños Templos",
  "Ser Mejor Persona","Cuando Debes Intervenir","El Liderazgo que Deja Huella",
];

const TEST_QS = [
  "¿Te cuesta tomar decisiones bajo presión?",
  "¿Tu equipo depende demasiado de ti?",
  "¿Te cuesta delegar sin perder el control?",
  "¿Tienes conflictos frecuentes en tu entorno?",
  "¿Te sientes estancado profesionalmente?",
  "¿Te cuesta recibir retroalimentación?",
  "¿Sientes que trabajas mucho y avanzas poco?",
  "¿Tu equipo tiene problemas de disciplina?",
  "¿Te cuesta manejar emociones bajo presión?",
  "¿Quieres crecer a un puesto de mayor liderazgo?",
];

function getResult(score) {
  if (score <= 3) return { level:"Nivel 1", serie:"Discernimiento", color:"#7B68EE", msg:"Tu punto de partida es aprender a leer mejor las situaciones antes de actuar." };
  if (score <= 5) return { level:"Nivel 2", serie:"Accountability", color:GOLD, msg:"Necesitas herramientas para generar resultados consistentes en tu equipo." };
  if (score <= 7) return { level:"Nivel 3", serie:"Liderazgo", color:"#E8834A", msg:"Estás listo para desarrollar personas. El siguiente paso es aprender a multiplicarte." };
  return { level:"Nivel 4", serie:"Cultura y Servicio", color:"#4CAF82", msg:"Tu enfoque debe estar en crear entornos donde las personas quieran dar lo mejor." };
}

export default function App() {
  const [section, setSection] = useState("inicio");
  const [testStep, setTestStep] = useState("intro");
  const [testIdx, setTestIdx] = useState(0);
  const [testScore, setTestScore] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([{type:"bot",text:"Hola 👋 Soy tu Mentor IA. ¿En qué te puedo ayudar hoy?"}]);
  const [chatInput, setChatInput] = useState("");
  const [form, setForm] = useState({name:"",email:"",msg:""});
  const [sent, setSent] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => { if(chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chatMsgs]);

  function answerTest(yes) {
    const newScore = testScore + (yes ? 1 : 0);
    if (testIdx < TEST_QS.length - 1) {
      setTestScore(newScore);
      setTestIdx(testIdx + 1);
    } else {
      setTestResult(getResult(newScore));
      setTestStep("result");
    }
  }

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };

  const NavBtn = ({id, label}) => (
    <button onClick={() => scrollTo(id)}
      style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:DARK,fontFamily:"Georgia",letterSpacing:0.5,padding:"4px 0",borderBottom:section===id?`2px solid ${GOLD}`:"2px solid transparent",transition:"all 0.2s"}}>
      {label}
    </button>
  );

  return (
    <div style={{background:WHITE,color:DARK,fontFamily:"Georgia,serif",minHeight:"100vh",overflowX:"hidden"}}>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(255,255,255,0.97)",backdropFilter:"blur(10px)",borderBottom:`1px solid rgba(0,0,0,0.08)`,height:64,display:"flex",alignItems:"center",padding:"0 40px",gap:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginRight:48}}>
          <div style={{width:28,height:28,border:`2px solid ${GOLD}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:GOLD,fontSize:10,fontFamily:"monospace",fontWeight:"bold"}}>✦</span>
          </div>
          <div>
            <div style={{fontWeight:"bold",fontSize:13,letterSpacing:1,lineHeight:1.2}}>JUAN CARLOS</div>
            <div style={{fontWeight:"bold",fontSize:13,letterSpacing:1,lineHeight:1.2}}>HERNÁNDEZ</div>
          </div>
        </div>
        <div style={{display:"flex",gap:28,flex:1}}>
          {[["inicio","INICIO"],["sobre","SOBRE MÍ"],["libros","LIBROS"],["podcast","PODCAST"],["conf","CONFERENCIAS"],["talleres","TALLERES"],["mentor","MENTOR IA"],["contact","CONTACTO"]].map(([id,label]) => (
            <NavBtn key={id} id={id} label={label} />
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="inicio" style={{minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,paddingTop:64,background:WHITE,overflow:"hidden"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 48px 80px 60px"}}>
          <div style={{fontSize:11,letterSpacing:4,color:GOLD,fontFamily:"monospace",marginBottom:24}}>LIDERAZGO PRÁCTICO PARA PERSONAS QUE QUIEREN</div>
          <h1 style={{fontSize:"clamp(36px,5vw,72px)",lineHeight:1.0,margin:"0 0 16px",fontWeight:"bold",letterSpacing:-1}}>
            <span style={{color:DARK}}>CRECER</span><br/>
            <span style={{color:GOLD}}>PROFESIONALMENTE.</span>
          </h1>
          <p style={{fontSize:18,color:MGRAY,marginBottom:40,lineHeight:1.6}}>
            De gerente a líder que transforma personas, equipos y organizaciones.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:48,maxWidth:480}}>
            {[["29 AÑOS","Desarrollando equipos, operaciones y líderes.","👥"],["+500","Episodios de aprendizaje.","▶️"],["3 LIBROS","Publicados y disponibles.","📚"]].map(([n,d,i],idx) => (
              <div key={idx}>
                <div style={{fontSize:11,marginBottom:6}}>{i}</div>
                <div style={{fontSize:22,fontWeight:"bold",color:GOLD}}>{n}</div>
                <div style={{fontSize:12,color:MGRAY,lineHeight:1.4}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:14}}>
            <button onClick={() => scrollTo("test")}
              style={{background:GOLD,color:WHITE,border:"none",padding:"16px 36px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1}}>
              COMENZAR EVALUACIÓN →
            </button>
            <button onClick={() => scrollTo("libros")}
              style={{background:"transparent",color:DARK,border:`2px solid ${DARK}`,padding:"16px 32px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",letterSpacing:1}}>
              VER LIBROS
            </button>
          </div>
        </div>

        {/* FOTO HERO */}
        <div style={{position:"relative",background:`linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)`,display:"flex",alignItems:"flex-end",justifyContent:"center",overflow:"hidden"}}>
          <img
            src="./IMAGENHEROPORTADADELSITIO.jpeg"
            alt="Juan Carlos Hernández"
            style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",opacity:0.85}}
          />
          <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)"}} />
          <div style={{position:"absolute",top:40,right:40,textAlign:"right",zIndex:2}}>
            <div style={{fontFamily:"cursive",fontSize:28,color:GOLD,lineHeight:1.2}}>Juan Carlos<br/>Hernández</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:8,letterSpacing:1}}>Autor | Conferencista<br/>Mentor | Empresario</div>
          </div>
          <div style={{position:"absolute",bottom:40,left:40,right:40,background:"rgba(0,0,0,0.5)",border:`1px solid rgba(201,168,76,0.4)`,borderRadius:8,padding:"16px 20px",zIndex:2}}>
            <p style={{color:"rgba(255,255,255,0.9)",fontSize:14,lineHeight:1.6,margin:0,fontStyle:"italic"}}>
              "No se trata del puesto que tienes, se trata del impacto que dejas en las personas."
            </p>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre" style={{padding:"80px 40px",background:DARK,overflow:"hidden"}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <img
              src="./SOBREMI.jpeg"
              alt="Juan Carlos Hernández"
              style={{width:"100%",borderRadius:12,objectFit:"cover",height:520,display:"block"}}
            />
            <div style={{position:"absolute",bottom:-20,right:-20,background:GOLD,borderRadius:8,padding:"16px 24px",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
              <div style={{fontSize:28,fontWeight:"bold",color:WHITE,lineHeight:1}}>29</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",letterSpacing:1}}>AÑOS DE<br/>EXPERIENCIA</div>
            </div>
          </div>
          <div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:16}}>SOBRE MÍ</div>
            <h2 style={{fontSize:36,fontWeight:"bold",color:WHITE,marginBottom:24,lineHeight:1.2}}>
              De las tiendas a los escenarios.
            </h2>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:16,lineHeight:1.8,marginBottom:20}}>
              Con 29 años liderando operaciones en OXXO, Walmart, Soriana y Six Flags, aprendí que el verdadero liderazgo no se trata de números — se trata de las personas detrás de ellos.
            </p>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:16,lineHeight:1.8,marginBottom:32}}>
              Hoy comparto ese conocimiento como autor, conferencista y mentor, porque lo que no se enseña en las aulas, lo enseña la operación real.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:32}}>
              {[["26","Unidades gestionadas simultáneamente"],["300%","Rotación estabilizada en 6 meses"],["3","Libros publicados"],["$40K→$800","Faltantes reducidos por tienda"]].map(([n,d],i) => (
                <div key={i} style={{borderLeft:`3px solid ${GOLD}`,paddingLeft:16}}>
                  <div style={{fontSize:22,fontWeight:"bold",color:GOLD}}>{n}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.4}}>{d}</div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("contact")}
              style={{background:GOLD,color:WHITE,border:"none",padding:"14px 32px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1}}>
              TRABAJEMOS JUNTOS →
            </button>
          </div>
        </div>
      </section>

      {/* BANNER EVALUACIÓN */}
      <section id="test" style={{background:LGRAY,padding:"48px 40px",borderTop:`4px solid ${GOLD}`}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          {testStep === "intro" && (
            <div style={{display:"flex",alignItems:"center",gap:32,flexWrap:"wrap"}}>
              <div style={{width:56,height:56,background:GOLD,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>📋</div>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:GOLD,letterSpacing:3,marginBottom:4,fontFamily:"monospace"}}>DESCUBRE DÓNDE ESTÁS HOY</div>
                <h3 style={{fontSize:20,margin:"0 0 4px",fontWeight:"bold"}}>Evaluación de 2 minutos</h3>
                <p style={{color:MGRAY,fontSize:14,margin:0}}>Responde algunas preguntas y recibe tu diagnóstico personalizado con tu ruta recomendada.</p>
              </div>
              <button onClick={() => setTestStep("pregunta")}
                style={{background:GOLD,color:WHITE,border:"none",padding:"16px 32px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1,flexShrink:0}}>
                COMENZAR EVALUACIÓN ›
              </button>
            </div>
          )}

          {testStep === "pregunta" && (
            <div style={{maxWidth:640,margin:"0 auto"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                <span style={{fontSize:13,color:MGRAY}}>Pregunta {testIdx+1} de {TEST_QS.length}</span>
                <span style={{fontSize:13,color:GOLD,fontFamily:"monospace"}}>{Math.round((testIdx/TEST_QS.length)*100)}%</span>
              </div>
              <div style={{background:"#E0E0E0",borderRadius:8,height:6,marginBottom:32}}>
                <div style={{background:GOLD,borderRadius:8,height:6,width:`${(testIdx/TEST_QS.length)*100}%`,transition:"width 0.4s"}}/>
              </div>
              <h3 style={{fontSize:20,marginBottom:32,fontWeight:"normal",lineHeight:1.5}}>{TEST_QS[testIdx]}</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[["Sí, me identifico",true],["No tanto",false]].map(([l,v]) => (
                  <button key={l} onClick={() => answerTest(v)}
                    style={{background:WHITE,border:`2px solid ${v?GOLD:"#DDD"}`,borderRadius:8,padding:"16px",cursor:"pointer",fontSize:15,fontFamily:"Georgia",color:v?GOLD:DARK,transition:"all 0.2s"}}
                    onMouseEnter={e => e.currentTarget.style.borderColor=GOLD}
                    onMouseLeave={e => e.currentTarget.style.borderColor=v?GOLD:"#DDD"}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {testStep === "result" && testResult && (
            <div style={{maxWidth:640,margin:"0 auto",textAlign:"center"}}>
              <div style={{background:WHITE,borderRadius:16,padding:40,border:`2px solid ${testResult.color}`}}>
                <div style={{fontSize:11,color:testResult.color,letterSpacing:3,marginBottom:12,fontFamily:"monospace"}}>{testResult.level}</div>
                <h3 style={{fontSize:26,color:DARK,marginBottom:12}}>Serie recomendada: {testResult.serie}</h3>
                <p style={{color:MGRAY,fontSize:16,lineHeight:1.7,marginBottom:28}}>{testResult.msg}</p>
                <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                  <button onClick={() => scrollTo("academia")}
                    style={{background:GOLD,color:WHITE,border:"none",padding:"14px 32px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold"}}>
                    Ver mi serie →
                  </button>
                  <button onClick={() => {setTestStep("intro");setTestIdx(0);setTestScore(0);}}
                    style={{background:"transparent",color:MGRAY,border:`1px solid #CCC`,padding:"14px 24px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia"}}>
                    Repetir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RUTA DE DESARROLLO */}
      <section style={{padding:"80px 40px",background:WHITE}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:12}}>ACADEMIA</div>
            <h2 style={{fontSize:32,fontWeight:"bold",margin:0}}>TU RUTA DE DESARROLLO</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
            {NIVELES.map((n,i) => (
              <div key={i} style={{textAlign:"center",padding:"20px 12px",border:`1px solid rgba(0,0,0,0.08)`,borderRadius:10,cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e => {e.currentTarget.style.borderColor=n.color;e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e => {e.currentTarget.style.borderColor="rgba(0,0,0,0.08)";e.currentTarget.style.transform="translateY(0)";}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:n.color+"20",border:`2px solid ${n.color}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px",fontSize:18}}>
                  {n.emoji}
                </div>
                <div style={{fontSize:11,color:n.color,fontFamily:"monospace",marginBottom:4}}>0{n.n}</div>
                <div style={{fontSize:12,color:DARK,lineHeight:1.3,fontWeight:"bold",whiteSpace:"pre-line"}}>{n.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APRENDE COMO PREFIERAS */}
      <section style={{padding:"80px 40px",background:LGRAY}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <h2 style={{fontSize:32,fontWeight:"bold",margin:0}}>APRENDE COMO PREFIERAS</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:12}}>
            {FORMATOS.map((f,i) => (
              <div key={i} style={{textAlign:"center",padding:"24px 12px",background:WHITE,borderRadius:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e => {e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 8px 24px rgba(201,168,76,0.2)`;}}
                onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)";}}>
                <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
                <div style={{fontSize:12,fontWeight:"bold",color:DARK,marginBottom:6}}>{f.title}</div>
                <div style={{fontSize:11,color:MGRAY,lineHeight:1.4}}>{f.desc}</div>
                {f.badge && <div style={{marginTop:8,fontSize:10,color:"#1DB954",fontWeight:"bold"}}>● {f.badge}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIBLIOTECA */}
      <section id="libros" style={{padding:"80px 40px",background:WHITE}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:12}}>LIBROS</div>
            <h2 style={{fontSize:32,fontWeight:"bold",margin:0}}>BIBLIOTECA DE CONOCIMIENTO</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:24,alignItems:"center"}}>
            {LIBROS.map((b,i) => (
              <div key={i} style={{background:b.bg,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}
                onMouseEnter={e => {e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.2)";}}
                onMouseLeave={e => {e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.1)";}}>
                <img src={b.img} alt={b.title} style={{width:"100%",height:200,objectFit:"cover",display:"block"}} />
                <div style={{padding:24}}>
                  <div style={{fontSize:11,color:b.accent,letterSpacing:2,fontFamily:"monospace",marginBottom:8}}>LIBRO {i+1}</div>
                  <h3 style={{fontSize:14,color:i===0?DARK:WHITE,lineHeight:1.4,margin:"0 0 8px",fontWeight:"bold"}}>{b.title}</h3>
                  <p style={{fontSize:12,color:i===0?MGRAY:"rgba(255,255,255,0.6)",margin:"0 0 16px",lineHeight:1.5}}>{b.sub}</p>
                  <a href={b.url} target="_blank" rel="noopener noreferrer"
                    style={{display:"inline-block",background:"transparent",border:`1px solid ${b.accent}`,color:b.accent,padding:"8px 16px",borderRadius:4,cursor:"pointer",fontSize:11,fontFamily:"Georgia",letterSpacing:1,textDecoration:"none"}}>
                    COMPRAR →
                  </a>
                </div>
              </div>
            ))}
            {/* Cita */}
            <div style={{padding:28,borderLeft:`4px solid ${GOLD}`}}>
              <div style={{fontSize:32,color:GOLD,marginBottom:12}}>"</div>
              <p style={{fontSize:16,lineHeight:1.7,color:DARK,fontStyle:"italic",margin:"0 0 16px"}}>
                No se trata del puesto que tienes, se trata del <strong>impacto</strong> que dejas en las personas.
              </p>
              <div style={{fontFamily:"cursive",fontSize:18,color:GOLD}}>Juan Carlos Hernández</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFERENCIAS */}
      <section id="conf" style={{padding:"80px 40px",background:DARK,overflow:"hidden"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:12}}>PARA EMPRESAS</div>
            <h2 style={{fontSize:32,fontWeight:"bold",color:WHITE,margin:0}}>CONFERENCIAS DE IMPACTO</h2>
          </div>

          {/* Foto conferencista */}
          <div style={{position:"relative",borderRadius:16,overflow:"hidden",marginBottom:48,height:360}}>
            <img src="./SECCIONCONFERENCIA1.jpeg" alt="Conferencia Juan Carlos Hernández"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}} />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)"}} />
            <div style={{position:"absolute",top:"50%",left:48,transform:"translateY(-50%)",maxWidth:400}}>
              <div style={{fontSize:11,color:GOLD,letterSpacing:3,fontFamily:"monospace",marginBottom:12}}>LIDERAZGO QUE GENERA RESULTADOS</div>
              <p style={{color:WHITE,fontSize:20,lineHeight:1.6,fontStyle:"italic",margin:"0 0 20px"}}>
                "Cada conferencia es una conversación honesta sobre lo que realmente pasa en las organizaciones."
              </p>
              <div style={{color:"rgba(255,255,255,0.6)",fontSize:13}}>— Juan Carlos Hernández</div>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:40}}>
            {CONFERENCIAS.map((c,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:10,padding:"20px 24px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",border:`1px solid rgba(255,255,255,0.08)`,transition:"all 0.2s"}}
                onMouseEnter={e => {e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.background="rgba(201,168,76,0.1)";}}
                onMouseLeave={e => {e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.05)";}}>
                <span style={{color:GOLD,fontFamily:"monospace",fontSize:12,minWidth:28}}>0{i+1}</span>
                <span style={{fontSize:14,color:WHITE}}>{c}</span>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center"}}>
            <button onClick={() => scrollTo("contact")}
              style={{background:GOLD,color:WHITE,border:"none",padding:"16px 48px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1}}>
              AGENDAR CONFERENCIA →
            </button>
          </div>
        </div>
      </section>

      {/* TALLERES */}
      <section id="talleres" style={{padding:"80px 40px",background:LGRAY}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:16}}>TALLERES</div>
            <h2 style={{fontSize:32,fontWeight:"bold",marginBottom:20}}>Formación que se queda en el equipo</h2>
            <p style={{color:MGRAY,fontSize:16,lineHeight:1.8,marginBottom:32}}>
              Los talleres no son charlas — son sesiones de trabajo donde los líderes practican, discuten y se llevan herramientas listas para aplicar el lunes siguiente.
            </p>
            {[["🎯","Talleres de 4 a 8 horas","Formato intensivo para equipos directivos."],["👥","Workshops para mandos medios","Herramientas prácticas de gestión operativa."],["🌱","Programas modulares","Formación continua a la medida de tu empresa."]].map(([e,n,d],i) => (
              <div key={i} style={{display:"flex",gap:16,marginBottom:20}}>
                <span style={{fontSize:20,flexShrink:0}}>{e}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:"bold",color:DARK,marginBottom:4}}>{n}</div>
                  <div style={{fontSize:13,color:MGRAY}}>{d}</div>
                </div>
              </div>
            ))}
            <button onClick={() => scrollTo("contact")}
              style={{background:GOLD,color:WHITE,border:"none",padding:"14px 32px",borderRadius:4,cursor:"pointer",fontSize:14,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1,marginTop:12}}>
              SOLICITAR INFORMACIÓN →
            </button>
          </div>
          <div style={{position:"relative",borderRadius:16,overflow:"hidden",height:480}}>
            <img src="./TALLERES.jpeg" alt="Taller de liderazgo"
              style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </div>
      </section>

      {/* PARA EMPRESAS + COMUNIDAD + RECURSOS */}
      <section style={{padding:"80px 40px",background:WHITE}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:48}}>

          {/* COMUNIDAD */}
          <div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:3,fontFamily:"monospace",marginBottom:20}}>COMUNIDAD</div>
            {[["▶️","YouTube","Videos para liderar mejor cada día.","https://www.youtube.com/@juancarloshernandezh1183"],["🎵","TikTok","Ideas rápidas que generan impacto.","https://www.tiktok.com/@juan.carlos.herna49"],["💼","LinkedIn","Artículos, reflexiones y herramientas.","#"],["🎙","Spotify","Podcast con historias reales.","#"]].map(([e,n,d,url],i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:14,marginBottom:20,cursor:"pointer",textDecoration:"none"}}
                onMouseEnter={ev => ev.currentTarget.style.opacity="0.7"}
                onMouseLeave={ev => ev.currentTarget.style.opacity="1"}>
                <span style={{fontSize:20,flexShrink:0}}>{e}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:"bold",color:DARK}}>{n}</div>
                  <div style={{fontSize:12,color:MGRAY}}>{d}</div>
                </div>
              </a>
            ))}
          </div>

          {/* PARA EMPRESAS */}
          <div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:3,fontFamily:"monospace",marginBottom:20}}>PARA EMPRESAS</div>
            {[["🎤","Conferencias de Impacto","Charlas que transforman equipos."],["👥","Talleres y Workshops","Formación práctica y vivencial."],["🏫","Escuelas de Liderazgo","Programas a la medida."],["🌱","Sistema Verde y Limpio","Operaciones que generan resultados."]].map(([e,n,d],i) => (
              <div key={i} style={{display:"flex",gap:14,marginBottom:20,cursor:"pointer"}}>
                <span style={{fontSize:20,flexShrink:0}}>{e}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:"bold",color:DARK}}>{n}</div>
                  <div style={{fontSize:12,color:MGRAY}}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* RECURSOS EXTRA */}
          <div>
            <div style={{fontSize:11,color:GOLD,letterSpacing:3,fontFamily:"monospace",marginBottom:20}}>RECURSOS EXTRA</div>
            {[["📝","Blog","Artículos y herramientas gratuitas."],["✉️","Newsletter","Liderazgo sin filtro en tu correo."],["💬","Contacto","Hablemos de cómo puedo ayudarte."],["📅","Eventos","Próximas conferencias y talleres."]].map(([e,n,d],i) => (
              <div key={i} style={{display:"flex",gap:14,marginBottom:20,cursor:"pointer"}}>
                <span style={{fontSize:20,flexShrink:0}}>{e}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:"bold",color:DARK}}>{n}</div>
                  <div style={{fontSize:12,color:MGRAY}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" style={{padding:"80px 40px",background:LGRAY}}>
        <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,color:GOLD,letterSpacing:4,fontFamily:"monospace",marginBottom:12}}>CONTACTO</div>
          <h2 style={{fontSize:32,fontWeight:"bold",marginBottom:12}}>Hablemos</h2>
          <p style={{color:MGRAY,marginBottom:40}}>Conferencias, talleres, consultoría o la Academia.</p>
          {!sent ? (
            <div style={{display:"flex",flexDirection:"column",gap:12,textAlign:"left"}}>
              {[["name","Tu nombre"],["email","Tu correo"]].map(([k,ph]) => (
                <input key={k} placeholder={ph} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                  style={{background:WHITE,border:`1px solid #DDD`,borderRadius:6,padding:"14px 18px",color:DARK,fontSize:15,fontFamily:"Georgia",outline:"none"}}/>
              ))}
              <textarea rows={4} placeholder="¿En qué te puedo ayudar?" value={form.msg} onChange={e => setForm({...form,msg:e.target.value})}
                style={{background:WHITE,border:`1px solid #DDD`,borderRadius:6,padding:"14px 18px",color:DARK,fontSize:15,fontFamily:"Georgia",resize:"vertical",outline:"none"}}/>
              <button onClick={() => {if(form.name&&form.email) setSent(true);}}
                style={{background:GOLD,color:WHITE,border:"none",padding:"16px",borderRadius:6,cursor:"pointer",fontSize:15,fontFamily:"Georgia",fontWeight:"bold",letterSpacing:1}}>
                ENVIAR MENSAJE →
              </button>
              <p style={{color:MGRAY,fontSize:13,textAlign:"center"}}>📞 744 310 7220 · hernandezhidalgo17@gmail.com</p>
            </div>
          ) : (
            <div style={{background:WHITE,border:`2px solid ${GOLD}`,borderRadius:12,padding:48}}>
              <div style={{fontSize:40,marginBottom:12}}>✓</div>
              <p style={{color:GOLD,fontSize:18,fontWeight:"bold"}}>¡Mensaje enviado!</p>
              <p style={{color:MGRAY}}>Te contactaré en menos de 24 horas.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:DARK,padding:"40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{color:GOLD,fontFamily:"monospace",fontSize:12,letterSpacing:2,marginBottom:8}}>JUAN CARLOS HERNÁNDEZ</div>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,margin:0}}>© 2026 · Todos los derechos reservados</p>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{color:"rgba(255,255,255,0.6)",fontSize:12,letterSpacing:2}}>MÁS CONOCIMIENTO · MEJORES DECISIONES · MAYOR IMPACTO</div>
          <div style={{color:GOLD,fontSize:13,marginTop:4,letterSpacing:1}}>LIDERAZGO REAL. RESULTADOS REALES.</div>
        </div>
        <div style={{display:"flex",gap:20}}>
          {["YouTube","TikTok","LinkedIn","Spotify"].map((s,i) => (
            <span key={i} style={{color:"rgba(255,255,255,0.4)",fontSize:12,cursor:"pointer",transition:"color 0.2s"}}
              onMouseEnter={e => e.target.style.color=GOLD}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.4)"}>{s}</span>
          ))}
        </div>
      </footer>

      {/* MENTOR IA - CHAT */}
      <div id="mentor" style={{position:"fixed",bottom:24,right:24,zIndex:999}}>
        {chatOpen && (
          <div style={{width:360,background:WHITE,border:`1px solid rgba(0,0,0,0.1)`,borderRadius:16,marginBottom:12,overflow:"hidden",boxShadow:"0 16px 48px rgba(0,0,0,0.15)"}}>
            <div style={{background:DARK,padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:GOLD,fontFamily:"monospace",fontSize:11,letterSpacing:2}}>🤖 MENTOR IA</div>
                <div style={{color:"rgba(255,255,255,0.5)",fontSize:11,marginTop:2}}>Juan Carlos Hernández · 24/7</div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:20}}>×</button>
            </div>
            <div ref={chatRef} style={{height:240,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10,background:LGRAY}}>
              {chatMsgs.map((m,i) => (
                <div key={i} style={{display:"flex",justifyContent:m.type==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"82%",padding:"10px 14px",borderRadius:m.type==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.type==="user"?GOLD:WHITE,color:m.type==="user"?WHITE:DARK,fontSize:13,lineHeight:1.5,boxShadow:"0 1px 4px rgba(0,0,0,0.08)"}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:"12px 16px",borderTop:`1px solid rgba(0,0,0,0.06)`,background:WHITE}}>
              <p style={{fontSize:11,color:MGRAY,marginBottom:8,letterSpacing:1}}>PREGUNTAS FRECUENTES</p>
              {[["¿Qué libro necesito?","Si sientes que trabajas mucho y avanzas poco → 'De Aplastado a Indispensable'. Si tienes personas a cargo → 'Lidera desde Quien Eres'."],["¿Por dónde empiezo?","Depende de tu rol. Colaborador → Discernimiento. Supervisor → Accountability. Gerente → Liderazgo. Dueño → Servicio y Cultura."],["¿Cómo agendo una conferencia?","Escríbeme a hernandezhidalgo17@gmail.com o al 744 310 7220. Tenemos disponibilidad para CDMX y toda la república."]].map((f,i) => (
                <button key={i} onClick={() => setChatMsgs(prev => [...prev,{type:"user",text:f[0]},{type:"bot",text:f[1]}])}
                  style={{background:LGRAY,border:`1px solid rgba(0,0,0,0.08)`,borderRadius:6,padding:"8px 12px",cursor:"pointer",textAlign:"left",fontSize:12,color:DARK,fontFamily:"Georgia",marginBottom:6,width:"100%"}}>
                  {f[0]}
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)}
          style={{width:56,height:56,borderRadius:"50%",background:GOLD,border:"none",cursor:"pointer",boxShadow:`0 4px 20px rgba(201,168,76,0.4)`,fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"auto"}}>
          {chatOpen ? "×" : "🤖"}
        </button>
      </div>

    </div>
  );
}
