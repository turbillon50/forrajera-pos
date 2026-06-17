'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ══════ PALETA REAL forrajera19hermanos.com.mx ══════
   Rojo principal: #8B0000
   Dorado:         #B8860B / #FFD700
   Fondo oscuro:   #2d0000 / #1a0000
   Fondo claro:    #f9f9f9
   Texto:          #333
══════════════════════════════════════════════════════ */

const BRAND   = '#8B0000'
const GOLD    = '#B8860B'
const GOLD2   = '#FFD700'
const DARK    = '#1a0000'
const BG      = '#f9f9f9'

/* ══════ DATOS ══════ */
const EMPRESAS = [
  { id:'tot',  nombre:'Tototlán',   full:'Sucursal Tototlán',   ciudad:'Tototlán, Jalisco',    img:'/images/sucursal_tototlan.jpg', color:BRAND },
  { id:'gdl',  nombre:'Guadalajara',full:'Sucursal Guadalajara', ciudad:'Guadalajara, Jalisco', img:'/images/sucursal_gdl.jpg',      color:'#6d1212' },
  { id:'mich', nombre:'Michoacán',  full:'Sucursal Michoacán',   ciudad:'Zamora, Michoacán',    img:'/images/productos_forraje.jpg', color:'#3e0a0a' },
]

const CATEGORIAS_IMG = [
  { nombre:'Bovinos',     img:'/images/sucursal_tototlan.jpg' },
  { nombre:'Porcinos',    img:'/images/productos_forraje.jpg' },
  { nombre:'Aves',        img:'/images/sucursal_gdl.jpg' },
  { nombre:'Granos',      img:'/images/hero_campo.jpg' },
  { nombre:'Suplementos', img:'/images/productos_forraje.jpg' },
  { nombre:'Caprinos',    img:'/images/sucursal_tototlan.jpg' },
]

const PRODUCTOS = [
  { id:1,  sku:'BOV-001', nombre:'Alimento Bovino Inicio',     cat:'Bovinos',     unidad:'costal 40kg', precio:485, stock:240 },
  { id:2,  sku:'BOV-002', nombre:'Alimento Bovino Desarrollo', cat:'Bovinos',     unidad:'costal 40kg', precio:465, stock:180 },
  { id:3,  sku:'POR-001', nombre:'Alimento Porcino Lechón',    cat:'Porcinos',    unidad:'costal 25kg', precio:380, stock:95  },
  { id:4,  sku:'POR-002', nombre:'Alimento Porcino Engorda',   cat:'Porcinos',    unidad:'costal 40kg', precio:420, stock:130 },
  { id:5,  sku:'AVI-001', nombre:'Alimento Avícola Postura',   cat:'Aves',        unidad:'costal 40kg', precio:360, stock:310 },
  { id:6,  sku:'AVI-002', nombre:'Alimento Avícola Engorda',   cat:'Aves',        unidad:'costal 40kg', precio:340, stock:275 },
  { id:7,  sku:'CAP-001', nombre:'Alimento Caprino Lactación', cat:'Caprinos',    unidad:'costal 25kg', precio:395, stock:60  },
  { id:8,  sku:'GRA-001', nombre:'Maíz Rolado',                cat:'Granos',      unidad:'costal 50kg', precio:285, stock:450 },
  { id:9,  sku:'GRA-002', nombre:'Sorgo Molido',               cat:'Granos',      unidad:'costal 50kg', precio:260, stock:380 },
  { id:10, sku:'SUP-001', nombre:'Pasta de Soya',              cat:'Suplementos', unidad:'costal 40kg', precio:720, stock:90  },
  { id:11, sku:'SUP-002', nombre:'Melaza de Caña',             cat:'Suplementos', unidad:'cubeta 20L',  precio:180, stock:75  },
  { id:12, sku:'SUP-003', nombre:'Sal Mineral Bovino',         cat:'Suplementos', unidad:'saco 25kg',   precio:420, stock:120 },
]

const VENTAS_DEMO = [
  { id:'V-001', cliente:'Rancho La Esperanza',  total:4850, hora:'10:23', metodo:'Efectivo',     empresa:'Tototlán' },
  { id:'V-002', cliente:'Granja Los Pinos',      total:2160, hora:'09:45', metodo:'Transferencia',empresa:'Guadalajara' },
  { id:'V-003', cliente:'Familia Rodríguez',     total:1440, hora:'09:12', metodo:'Efectivo',     empresa:'Tototlán' },
  { id:'V-004', cliente:'Engordadora El Pital',  total:8720, hora:'08:50', metodo:'Crédito',      empresa:'Michoacán' },
]

type CartItem = { p: typeof PRODUCTOS[0]; qty: number }

/* ══════ SPLASH ══════ */
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{ opacity:1 }} exit={{ opacity:0, scale:1.05 }} transition={{ duration:0.5 }}
      style={{ position:'fixed', inset:0, zIndex:9999, background:DARK,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      {/* Imagen de fondo */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
        <img src="/images/hero_campo.jpg" alt=""
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.25) saturate(0.8)' }}/>
        <div style={{ position:'absolute', inset:0,
          background:`radial-gradient(ellipse at center, ${BRAND}33 0%, ${DARK}ee 70%)` }}/>
      </div>

      <motion.div initial={{ opacity:0, y:30, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.8, ease:'easeOut' }}
        style={{ position:'relative', textAlign:'center', display:'flex', flexDirection:'column',
          alignItems:'center', gap:20 }}>

        {/* Logo real */}
        <div style={{ width:100, height:100, borderRadius:24, overflow:'hidden',
          border:`3px solid ${GOLD}66`, background:'rgba(0,0,0,0.4)',
          boxShadow:`0 0 60px ${BRAND}88` }}>
          <img src="/images/logo.png" alt="19H"
            style={{ width:'100%', height:'100%', objectFit:'contain', padding:8 }}
            onError={(e:any) => { e.target.style.display='none' }}/>
        </div>

        <div>
          <div style={{ fontFamily:'Georgia,serif', fontSize:32, color:'#fff',
            letterSpacing:'0.05em', marginBottom:6 }}>Forrajera</div>
          <div style={{ fontFamily:'Georgia,serif', fontSize:22, color:GOLD2,
            letterSpacing:'0.08em', marginBottom:10 }}>19 Hermanos</div>
          <div style={{ width:60, height:2, background:GOLD, margin:'0 auto 10px',
            borderRadius:1 }}/>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', textTransform:'uppercase',
            letterSpacing:'0.2em' }}>Sistema de ventas</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════ LANDING ══════ */
function Landing({ onEntrar }: { onEntrar: () => void }) {
  return (
    <div style={{ background:BG, minHeight:'100svh', fontFamily:"'Poppins',sans-serif" }}>

      {/* NAV */}
      <div style={{ background:'#fff', borderBottom:`2px solid ${BRAND}`, padding:'0 20px',
        height:64, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 12px rgba(139,0,0,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src="/images/logo.png" alt="19H"
            style={{ width:44, height:44, objectFit:'contain', borderRadius:8 }}
            onError={(e:any) => { e.target.style.display='none' }}/>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:BRAND, lineHeight:1.2 }}>
              Forrajera 19 Hermanos
            </div>
            <div style={{ fontSize:10, color:'#888' }}>Tototlán, Jalisco · Desde 2003</div>
          </div>
        </div>
        <motion.button whileTap={{ scale:0.96 }} onClick={onEntrar}
          style={{ padding:'9px 18px', borderRadius:999, border:'none', cursor:'pointer',
            background:BRAND, color:'#fff', fontSize:12, fontWeight:700, fontFamily:'inherit',
            boxShadow:`0 4px 12px ${BRAND}44` }}>
          Iniciar sesión
        </motion.button>
      </div>

      {/* HERO */}
      <div style={{ position:'relative', height:'72svh', overflow:'hidden' }}>
        <img src="/images/hero_campo.jpg" alt="Campo"
          style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.55)' }}/>
        <div style={{ position:'absolute', inset:0,
          background:'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(26,0,0,0.85) 100%)' }}/>
        <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:2.5, duration:0.8 }}
          style={{ position:'absolute', bottom:0, left:0, right:0, padding:'32px 24px' }}>
          <div style={{ fontSize:11, color:GOLD2, textTransform:'uppercase',
            letterSpacing:'0.2em', marginBottom:10, fontWeight:600 }}>
            ● MÁS DE 20 AÑOS EN EL CAMPO
          </div>
          <h1 style={{ fontFamily:'Georgia,serif', fontSize:'clamp(2rem,7vw,3rem)',
            color:'#fff', lineHeight:1.1, marginBottom:12 }}>
            Calidad que<br/>
            <span style={{ color:GOLD2 }}>nutre el campo</span>
          </h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,0.8)', marginBottom:24,
            maxWidth:400, lineHeight:1.6 }}>
            De una familia de 19 hermanos de Tototlán, Jalisco a productores
            de todo México.
          </p>
          <div style={{ display:'flex', gap:12 }}>
            <motion.button whileTap={{ scale:0.96 }} onClick={onEntrar}
              style={{ padding:'13px 24px', borderRadius:12, border:'none', cursor:'pointer',
                background:BRAND, color:'#fff', fontSize:14, fontWeight:700,
                fontFamily:'inherit', boxShadow:`0 6px 20px ${BRAND}66` }}>
              Entrar al sistema →
            </motion.button>
            <a href="tel:+523919160449"
              style={{ padding:'13px 20px', borderRadius:12, border:`2px solid ${GOLD}`,
                color:GOLD2, fontSize:14, fontWeight:600, textDecoration:'none',
                display:'inline-flex', alignItems:'center', gap:6 }}>
              📞 Llamar
            </a>
          </div>
        </motion.div>
      </div>

      {/* CATEGORÍAS con imágenes Higgsfield */}
      <div style={{ padding:'40px 16px', maxWidth:640, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:11, color:BRAND, textTransform:'uppercase',
            letterSpacing:'0.15em', fontWeight:700, marginBottom:6 }}>LÍNEAS DE PRODUCTO</div>
          <h2 style={{ fontFamily:'Georgia,serif', fontSize:26, color:DARK }}>
            Alimentos balanceados
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {CATEGORIAS_IMG.map((cat,i) => (
            <motion.div key={cat.nombre} initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }}
              style={{ position:'relative', aspectRatio:'1/1', borderRadius:20,
                overflow:'hidden', border:`3px solid ${GOLD2}`,
                boxShadow:'0 8px 20px rgba(0,0,0,0.2)', cursor:'pointer' }}>
              <img src={cat.img} alt={cat.nombre}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0,
                background:'linear-gradient(to top, rgba(26,0,0,0.9) 0%, transparent 50%)' }}/>
              <div style={{ position:'absolute', bottom:8, left:0, right:0, textAlign:'center',
                fontWeight:800, fontSize:13, color:GOLD2,
                textShadow:'0 2px 8px rgba(0,0,0,0.8)', padding:'0 6px' }}>
                {cat.nombre}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SUCURSALES */}
      <div style={{ background:DARK, padding:'40px 16px' }}>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div style={{ fontSize:11, color:GOLD, textTransform:'uppercase',
              letterSpacing:'0.15em', fontWeight:700, marginBottom:6 }}>PRESENCIA</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:24, color:'#fff' }}>
              3 sucursales
            </h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {EMPRESAS.map((e,i) => (
              <motion.div key={e.id} initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.1 }}
                style={{ borderRadius:16, overflow:'hidden', border:`1px solid ${GOLD}33`,
                  display:'flex', height:100 }}>
                <img src={e.img} alt={e.nombre}
                  style={{ width:100, height:'100%', objectFit:'cover', flexShrink:0 }}/>
                <div style={{ padding:'14px 16px', display:'flex', flexDirection:'column',
                  justifyContent:'center', background:'rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize:15, fontWeight:700, color:'#fff', marginBottom:4 }}>
                    {e.full}
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>{e.ciudad}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ padding:'40px 24px', textAlign:'center', background:BG }}>
        <img src="/images/logo.png" alt="19H"
          style={{ width:60, height:60, objectFit:'contain', marginBottom:16, borderRadius:12 }}
          onError={(e:any) => { e.target.style.display='none' }}/>
        <div style={{ fontFamily:'Georgia,serif', fontSize:22, color:DARK, marginBottom:8 }}>
          ¿Eres empleado de Forrajera 19H?
        </div>
        <div style={{ fontSize:13, color:'#888', marginBottom:20 }}>
          Accede al sistema de ventas con tu cuenta
        </div>
        <motion.button whileTap={{ scale:0.97 }} onClick={onEntrar}
          style={{ padding:'14px 32px', borderRadius:999, border:'none', cursor:'pointer',
            background:BRAND, color:'#fff', fontSize:15, fontWeight:700,
            fontFamily:'inherit', boxShadow:`0 8px 24px ${BRAND}44` }}>
          Iniciar sesión →
        </motion.button>
      </div>
    </div>
  )
}

/* ══════ SELECTOR EMPRESA ══════ */
function SelectorEmpresa({ onSelect, onBack }: {
  onSelect: (e: typeof EMPRESAS[0]) => void
  onBack: () => void
}) {
  return (
    <div style={{ minHeight:'100svh', background:DARK, display:'flex',
      flexDirection:'column', fontFamily:"'Poppins',sans-serif" }}>
      {/* Header */}
      <div style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:12,
        borderBottom:`1px solid ${BRAND}44` }}>
        <button onClick={onBack} style={{ width:36, height:36, borderRadius:10, border:'none',
          background:'rgba(255,255,255,0.07)', cursor:'pointer', color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
          ‹
        </button>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>Forrajera 19 Hermanos</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)' }}>Selecciona tu sucursal</div>
        </div>
      </div>

      <div style={{ flex:1, padding:'24px 20px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {EMPRESAS.map((e,i) => (
            <motion.div key={e.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.05+i*0.08 }} whileTap={{ scale:0.98 }}
              onClick={() => onSelect(e)}
              style={{ borderRadius:20, overflow:'hidden', cursor:'pointer', position:'relative',
                height:120, border:`2px solid ${GOLD}44`,
                boxShadow:`0 8px 24px rgba(0,0,0,0.4)` }}>
              <img src={e.img} alt={e.nombre}
                style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.5)' }}/>
              <div style={{ position:'absolute', inset:0,
                background:`linear-gradient(135deg, ${e.color}cc 0%, transparent 60%)` }}/>
              <div style={{ position:'absolute', inset:0, padding:'16px 20px',
                display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:18, fontWeight:800, color:'#fff',
                    textShadow:'0 2px 8px rgba(0,0,0,0.8)' }}>{e.full}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>{e.ciudad}</div>
                </div>
                <div style={{ width:32, height:32, borderRadius:'50%',
                  background:'rgba(255,255,255,0.15)', border:`1px solid ${GOLD}66`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18, color:GOLD2 }}>›</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════ POS ══════ */
function POS({ empresa, onBack }: { empresa: typeof EMPRESAS[0]; onBack: () => void }) {
  const [tab, setTab] = useState<'venta'|'historial'|'inventario'|'admin'>('venta')
  const [cat, setCat] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [showCarrito, setShowCarrito] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [ventaOk, setVentaOk] = useState(false)
  const [metodo, setMetodo] = useState('efectivo')
  const [cliente, setCliente] = useState('')
  const [ventas, setVentas] = useState(VENTAS_DEMO)

  const CATS = ['Todos','Bovinos','Porcinos','Aves','Caprinos','Granos','Suplementos']

  const prodFiltrados = PRODUCTOS.filter(p =>
    (cat==='Todos'||p.cat===cat) &&
    (!busqueda||p.nombre.toLowerCase().includes(busqueda.toLowerCase())||p.sku.toLowerCase().includes(busqueda.toLowerCase()))
  )

  const totalCarrito = carrito.reduce((a,i)=>a+i.p.precio*i.qty,0)
  const totalHoy = ventas.reduce((a,v)=>a+v.total,0)
  const qCarrito = carrito.reduce((a,i)=>a+i.qty,0)

  const add = (p: typeof PRODUCTOS[0]) => setCarrito(prev => {
    const ex = prev.find(i=>i.p.id===p.id)
    if (ex) return prev.map(i=>i.p.id===p.id?{...i,qty:i.qty+1}:i)
    return [...prev,{p,qty:1}]
  })
  const upd = (id:number,d:number) => setCarrito(prev=>
    prev.map(i=>i.p.id===id?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0))

  const confirmar = () => {
    setVentas(prev => [{
      id:`V-${String(prev.length+1).padStart(3,'0')}`,
      cliente:cliente||'Mostrador',
      total:totalCarrito,
      hora:new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
      metodo:metodo==='efectivo'?'Efectivo':metodo==='transferencia'?'Transferencia':'Crédito',
      empresa:empresa.nombre,
    },...prev])
    setShowConfirm(false); setVentaOk(true)
    setTimeout(()=>{setVentaOk(false);setCarrito([]);setShowCarrito(false);setCliente('')},2500)
  }

  const TABS = [
    {id:'venta',     l:'Venta'},
    {id:'historial', l:'Historial'},
    {id:'inventario',l:'Inventario'},
    {id:'admin',     l:'Admin'},
  ] as const

  return (
    <>
      {/* VENTA OK */}
      <AnimatePresence>
        {ventaOk && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,0.95)',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
            <motion.div initial={{scale:0,rotate:-10}} animate={{scale:1,rotate:0}}
              transition={{type:'spring',damping:12}}>
              <div style={{width:96,height:96,borderRadius:'50%',background:BRAND,
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:44,
                boxShadow:`0 0 60px ${BRAND}`}}>✓</div>
            </motion.div>
            <div style={{fontSize:24,fontWeight:700,color:'#fff',fontFamily:"'Poppins',sans-serif"}}>
              ¡Venta registrada!
            </div>
            <div style={{fontFamily:'Georgia,serif',fontSize:36,color:GOLD2,fontWeight:700}}>
              ${totalCarrito.toLocaleString()}
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.4)'}}>{empresa.full}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CARRITO */}
      <AnimatePresence>
        {showCarrito && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.85)',
              backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-end'}}
            onClick={()=>setShowCarrito(false)}>
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
              transition={{type:'spring',damping:28,stiffness:280}}
              style={{width:'100%',maxWidth:480,margin:'0 auto',background:'#1a0000',
                borderRadius:'24px 24px 0 0',maxHeight:'88svh',
                display:'flex',flexDirection:'column',
                border:`1px solid ${GOLD}33`}}
              onClick={e=>e.stopPropagation()}>

              <div style={{padding:'16px 20px',borderBottom:`1px solid ${BRAND}44`,
                display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:'#fff',fontFamily:"'Poppins',sans-serif"}}>
                    Ticket de venta
                  </div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.5)'}}>{qCarrito} productos</div>
                </div>
                <button onClick={()=>setShowCarrito(false)}
                  style={{width:32,height:32,borderRadius:'50%',border:`1px solid ${BRAND}66`,
                    background:'transparent',cursor:'pointer',color:'#888',fontSize:18}}>✕</button>
              </div>

              <div style={{padding:'12px 20px',borderBottom:`1px solid ${BRAND}33`,flexShrink:0}}>
                <input placeholder="Cliente (opcional)" value={cliente}
                  onChange={e=>setCliente(e.target.value)}
                  style={{width:'100%',padding:'10px 14px',borderRadius:10,
                    border:`1px solid ${BRAND}44`,background:'rgba(255,255,255,0.05)',
                    color:'#fff',fontSize:13,outline:'none',boxSizing:'border-box',
                    fontFamily:"'Poppins',sans-serif"}}/>
              </div>

              <div style={{overflowY:'auto',flex:1}}>
                {carrito.map(item=>(
                  <div key={item.p.id} style={{padding:'12px 20px',display:'flex',
                    alignItems:'center',justifyContent:'space-between',
                    borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#f0f0f0',
                        overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        {item.p.nombre}
                      </div>
                      <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>
                        {item.p.unidad} · ${item.p.precio.toLocaleString()} c/u
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
                      <button onClick={()=>upd(item.p.id,-1)}
                        style={{width:28,height:28,borderRadius:'50%',border:`1px solid ${BRAND}66`,
                          background:'transparent',cursor:'pointer',color:'#fff',fontSize:18,
                          display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                      <span style={{color:'#fff',fontWeight:700,width:24,textAlign:'center'}}>
                        {item.qty}
                      </span>
                      <button onClick={()=>upd(item.p.id,1)}
                        style={{width:28,height:28,borderRadius:'50%',border:'none',
                          background:BRAND,cursor:'pointer',color:'#fff',fontSize:18,
                          display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
                      <span style={{color:GOLD2,fontWeight:700,fontSize:13,minWidth:64,textAlign:'right'}}>
                        ${(item.p.precio*item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{padding:20,borderTop:`1px solid ${BRAND}44`,flexShrink:0}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
                  <span style={{color:'rgba(255,255,255,0.5)',fontSize:14}}>Total</span>
                  <span style={{fontFamily:'Georgia,serif',fontSize:28,color:GOLD2,fontWeight:700}}>
                    ${totalCarrito.toLocaleString()}
                  </span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
                  {[['efectivo','💵 Efectivo'],['transferencia','🏦 Transfer.'],['credito','📋 Crédito']].map(([m,l])=>(
                    <button key={m} onClick={()=>setMetodo(m)}
                      style={{padding:'9px 4px',borderRadius:10,fontSize:11,fontWeight:600,
                        cursor:'pointer',fontFamily:"'Poppins',sans-serif",
                        border:`1.5px solid ${metodo===m?GOLD:BRAND+'66'}`,
                        background:metodo===m?`${BRAND}33`:'transparent',
                        color:metodo===m?GOLD2:'rgba(255,255,255,0.4)'}}>
                      {l}
                    </button>
                  ))}
                </div>
                <motion.button whileTap={{scale:0.97}} onClick={()=>setShowConfirm(true)}
                  style={{width:'100%',padding:'14px',borderRadius:14,border:'none',
                    cursor:'pointer',background:BRAND,color:'#fff',fontSize:15,fontWeight:700,
                    fontFamily:"'Poppins',sans-serif",boxShadow:`0 8px 24px ${BRAND}66`}}>
                  Cobrar ${totalCarrito.toLocaleString()}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONFIRMAR */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:400,background:'rgba(0,0,0,0.92)',
              display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <motion.div initial={{scale:0.85,y:20}} animate={{scale:1,y:0}}
              style={{background:DARK,borderRadius:24,padding:32,maxWidth:320,width:'100%',
                textAlign:'center',border:`1px solid ${GOLD}44`}}>
              <div style={{fontSize:40,marginBottom:12}}>🧾</div>
              <div style={{fontSize:18,fontWeight:700,color:'#fff',marginBottom:4,
                fontFamily:"'Poppins',sans-serif"}}>Confirmar venta</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:13,marginBottom:4}}>
                {cliente||'Mostrador'} · {empresa.full}
              </div>
              <div style={{fontFamily:'Georgia,serif',fontSize:40,color:GOLD2,
                fontWeight:700,margin:'16px 0 24px'}}>
                ${totalCarrito.toLocaleString()}
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>setShowConfirm(false)}
                  style={{flex:1,padding:14,borderRadius:12,border:`1px solid ${BRAND}66`,
                    background:'transparent',color:'#fff',cursor:'pointer',fontSize:14,
                    fontFamily:"'Poppins',sans-serif"}}>
                  Cancelar
                </button>
                <motion.button whileTap={{scale:0.97}} onClick={confirmar}
                  style={{flex:2,padding:14,borderRadius:12,border:'none',
                    background:BRAND,color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,
                    fontFamily:"'Poppins',sans-serif"}}>
                  ✓ Confirmar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* APP LAYOUT */}
      <div style={{minHeight:'100svh',background:'#111',paddingBottom:80,
        fontFamily:"'Poppins',sans-serif"}}>

        {/* HEADER */}
        <div style={{position:'sticky',top:0,zIndex:50,
          background:'rgba(17,17,17,0.97)',backdropFilter:'blur(16px)',
          borderBottom:`2px solid ${BRAND}`,
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'10px 16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={onBack} style={{width:34,height:34,borderRadius:10,
              border:`1px solid ${BRAND}66`,background:'transparent',cursor:'pointer',
              color:'rgba(255,255,255,0.6)',fontSize:18}}>‹</button>
            <div style={{width:6,height:6,borderRadius:'50%',background:empresa.color}}/>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#fff'}}>{empresa.full}</div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>{empresa.ciudad}</div>
            </div>
          </div>
          <AnimatePresence>
            {qCarrito > 0 && tab === 'venta' && (
              <motion.button initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                whileTap={{scale:0.95}} onClick={()=>setShowCarrito(true)}
                style={{position:'relative',padding:'8px 16px',borderRadius:999,border:'none',
                  cursor:'pointer',background:BRAND,color:'#fff',fontSize:13,fontWeight:700,
                  display:'flex',alignItems:'center',gap:6,
                  boxShadow:`0 4px 16px ${BRAND}88`}}>
                🛒 ${totalCarrito.toLocaleString()}
                <div style={{position:'absolute',top:-5,right:-5,width:20,height:20,
                  borderRadius:'50%',background:GOLD2,color:'#111',fontSize:10,fontWeight:800,
                  display:'flex',alignItems:'center',justifyContent:'center'}}>{qCarrito}</div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* VENTA */}
        {tab === 'venta' && (
          <div style={{padding:'12px 14px'}}>
            <input placeholder="🔍 Buscar producto o SKU..." value={busqueda}
              onChange={e=>setBusqueda(e.target.value)}
              style={{width:'100%',padding:'11px 14px',borderRadius:12,marginBottom:12,
                border:`1px solid ${BRAND}44`,background:'rgba(255,255,255,0.05)',
                color:'#fff',fontSize:13,outline:'none',boxSizing:'border-box',
                fontFamily:"'Poppins',sans-serif"}}/>

            {/* Categorías */}
            <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,marginBottom:12,
              scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}}>
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)}
                  style={{flexShrink:0,padding:'6px 16px',borderRadius:999,fontSize:12,
                    fontWeight:600,cursor:'pointer',fontFamily:"'Poppins',sans-serif",
                    whiteSpace:'nowrap',
                    border:`1.5px solid ${cat===c?GOLD:BRAND+'44'}`,
                    background:cat===c?BRAND:'transparent',
                    color:cat===c?'#fff':'rgba(255,255,255,0.4)'}}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grid productos */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {prodFiltrados.map((p,i)=>{
                const enCarrito = carrito.find(c=>c.p.id===p.id)
                return (
                  <motion.div key={p.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                    transition={{delay:i*0.025}} whileTap={{scale:0.96}}
                    onClick={()=>add(p)}
                    style={{background:enCarrito?`${BRAND}22`:'#1a1a1a',
                      border:`1.5px solid ${enCarrito?GOLD:'rgba(255,255,255,0.07)'}`,
                      borderRadius:16,padding:14,cursor:'pointer',
                      boxShadow:enCarrito?`0 0 20px ${BRAND}44`:undefined}}>
                    <div style={{display:'flex',justifyContent:'space-between',
                      alignItems:'flex-start',marginBottom:8}}>
                      <span style={{fontSize:9,color:'rgba(255,255,255,0.3)',
                        textTransform:'uppercase',letterSpacing:'0.08em'}}>{p.sku}</span>
                      {enCarrito&&(
                        <div style={{width:20,height:20,borderRadius:'50%',background:BRAND,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:11,color:'#fff',fontWeight:800}}>{enCarrito.qty}</div>
                      )}
                    </div>
                    <div style={{fontSize:13,fontWeight:600,color:'#f0f0f0',lineHeight:1.3,
                      marginBottom:4,display:'-webkit-box',WebkitLineClamp:2,
                      WebkitBoxOrient:'vertical',overflow:'hidden'}}>{p.nombre}</div>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginBottom:10}}>
                      {p.unidad}
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <span style={{fontFamily:'Georgia,serif',fontSize:17,
                        fontWeight:700,color:GOLD2}}>${p.precio.toLocaleString()}</span>
                      <div style={{width:30,height:30,borderRadius:'50%',background:BRAND,
                        display:'flex',alignItems:'center',justifyContent:'center',
                        color:'#fff',fontSize:20,fontWeight:300}}>+</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* HISTORIAL */}
        {tab === 'historial' && (
          <div style={{padding:'16px 14px'}}>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',
              letterSpacing:'0.1em',marginBottom:6}}>VENTAS DEL DÍA</div>
            <div style={{fontFamily:'Georgia,serif',fontSize:28,color:GOLD2,
              fontWeight:700,marginBottom:20}}>${totalHoy.toLocaleString()}</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {ventas.map((v,i)=>(
                <motion.div key={v.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.05}}
                  style={{background:'#1a1a1a',border:`1px solid ${BRAND}44`,
                    borderRadius:14,padding:'13px 16px',
                    display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:'#f0f0f0'}}>{v.cliente}</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>
                      {v.id} · {v.metodo} · {v.hora} · {v.empresa}
                    </div>
                  </div>
                  <div style={{fontFamily:'Georgia,serif',fontSize:16,fontWeight:700,color:GOLD2}}>
                    ${v.total.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTARIO */}
        {tab === 'inventario' && (
          <div style={{padding:'16px 14px'}}>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',
              letterSpacing:'0.1em',marginBottom:14}}>{PRODUCTOS.length} PRODUCTOS</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {PRODUCTOS.map((p,i)=>(
                <motion.div key={p.id} initial={{opacity:0}} animate={{opacity:1}}
                  transition={{delay:i*0.03}}
                  style={{background:'#1a1a1a',border:`1px solid ${BRAND}33`,
                    borderRadius:12,padding:'12px 16px',
                    display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:'#f0f0f0'}}>{p.nombre}</div>
                    <div style={{fontSize:11,color:'rgba(255,255,255,0.3)'}}>
                      {p.sku} · {p.unidad}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:14,fontWeight:700,color:GOLD2}}>
                      ${p.precio.toLocaleString()}
                    </div>
                    <div style={{fontSize:11,color:p.stock<80?'#FF9800':'#4CAF50'}}>
                      {p.stock} disp.
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab === 'admin' && (
          <div style={{padding:'16px 14px'}}>
            {/* Banner de empresa */}
            <div style={{borderRadius:20,overflow:'hidden',marginBottom:20,position:'relative',height:120}}>
              <img src={empresa.img} alt={empresa.nombre}
                style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.5)'}}/>
              <div style={{position:'absolute',inset:0,padding:'16px 20px',
                display:'flex',alignItems:'flex-end'}}>
                <div>
                  <div style={{fontSize:18,fontWeight:800,color:'#fff'}}>{empresa.full}</div>
                  <div style={{fontSize:12,color:GOLD2}}>{empresa.ciudad}</div>
                </div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
              {[
                {l:'Ventas hoy',    v:`$${totalHoy.toLocaleString()}`, c:GOLD2},
                {l:'Transacciones', v:ventas.length.toString(),         c:'#fff'},
                {l:'Productos',     v:PRODUCTOS.length.toString(),      c:'#FF9800'},
                {l:'Sucursales',    v:'3',                               c:'#4CAF50'},
              ].map((s,i)=>(
                <div key={i} style={{background:'#1a1a1a',borderRadius:14,padding:'16px',
                  border:`1px solid ${BRAND}44`}}>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',marginBottom:6}}>{s.l}</div>
                  <div style={{fontFamily:'Georgia,serif',fontSize:24,color:s.c,fontWeight:700}}>
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            {/* Sucursales con foto Higgsfield */}
            <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',
              letterSpacing:'0.1em',marginBottom:12}}>TODAS LAS SUCURSALES</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {EMPRESAS.map(e=>{
                const vs = ventas.filter(v=>v.empresa===e.nombre)
                const tot = vs.reduce((a,v)=>a+v.total,0)
                return (
                  <div key={e.id} style={{borderRadius:14,overflow:'hidden',position:'relative',
                    height:80,border:`1px solid ${GOLD}33`}}>
                    <img src={e.img} alt={e.nombre}
                      style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.4)'}}/>
                    <div style={{position:'absolute',inset:0,padding:'10px 16px',
                      display:'flex',alignItems:'center',justifyContent:'space-between',
                      background:`linear-gradient(135deg, ${e.color}99 0%, transparent 60%)`}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{e.full}</div>
                        <div style={{fontSize:11,color:'rgba(255,255,255,0.5)'}}>
                          {vs.length} ventas hoy
                        </div>
                      </div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:18,
                        fontWeight:700,color:GOLD2}}>${tot.toLocaleString()}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV — sin íconos, texto limpio */}
      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,
        background:'rgba(17,17,17,0.98)',backdropFilter:'blur(20px)',
        borderTop:`2px solid ${BRAND}`,
        display:'flex',alignItems:'stretch',zIndex:100}}>
        {TABS.map(({id,l})=>(
          <motion.button key={id} onClick={()=>setTab(id)} whileTap={{scale:0.95}}
            style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',
              padding:'0 4px',border:'none',cursor:'pointer',background:'transparent',
              fontFamily:"'Poppins',sans-serif",
              fontSize:tab===id?12:11,fontWeight:tab===id?700:400,
              color:tab===id?GOLD2:'rgba(255,255,255,0.35)',
              borderTop:tab===id?`3px solid ${BRAND}`:'3px solid transparent',
              transition:'all 150ms',letterSpacing:'0.02em',
              textTransform:'uppercase'}}>
            {l}
          </motion.button>
        ))}
      </nav>
    </>
  )
}

/* ══════ ROOT ══════ */
export default function ForrajeraApp() {
  const [step, setStep] = useState<'splash'|'landing'|'selector'|'pos'>('splash')
  const [empresa, setEmpresa] = useState<typeof EMPRESAS[0]|null>(null)

  return (
    <AnimatePresence mode="wait">
      {step==='splash' && (
        <motion.div key="splash" exit={{opacity:0}}>
          <Splash onDone={()=>setStep('landing')}/>
        </motion.div>
      )}
      {step==='landing' && (
        <motion.div key="landing" initial={{opacity:0}} animate={{opacity:1}}>
          <Landing onEntrar={()=>setStep('selector')}/>
        </motion.div>
      )}
      {step==='selector' && (
        <motion.div key="selector" initial={{opacity:0}} animate={{opacity:1}}>
          <SelectorEmpresa
            onSelect={e=>{setEmpresa(e);setStep('pos')}}
            onBack={()=>setStep('landing')}/>
        </motion.div>
      )}
      {step==='pos' && empresa && (
        <motion.div key="pos" initial={{opacity:0}} animate={{opacity:1}}>
          <POS empresa={empresa} onBack={()=>setStep('selector')}/>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
