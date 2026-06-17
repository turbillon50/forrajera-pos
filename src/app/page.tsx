'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ══════════════════════════════════════════
   DATOS
══════════════════════════════════════════ */
const EMPRESAS = [
  { id:'tot', nombre:'19H Tototlán',   ciudad:'Tototlán, Jalisco',    color:'#C62828' },
  { id:'gdl', nombre:'19H Guadalajara',ciudad:'Guadalajara, Jalisco', color:'#1565C0' },
  { id:'mich',nombre:'19H Michoacán',  ciudad:'Zamora, Michoacán',    color:'#2E7D32' },
]

const PRODUCTOS = [
  { id:1, sku:'BOV-001', nombre:'Alimento Bovino Inicio',        cat:'Bovinos',     unidad:'costal 40kg', precio:485, stock:240 },
  { id:2, sku:'BOV-002', nombre:'Alimento Bovino Desarrollo',    cat:'Bovinos',     unidad:'costal 40kg', precio:465, stock:180 },
  { id:3, sku:'POR-001', nombre:'Alimento Porcino Lechón',       cat:'Porcinos',    unidad:'costal 25kg', precio:380, stock:95  },
  { id:4, sku:'POR-002', nombre:'Alimento Porcino Engorda',      cat:'Porcinos',    unidad:'costal 40kg', precio:420, stock:130 },
  { id:5, sku:'AVI-001', nombre:'Alimento Avícola Postura',      cat:'Aves',        unidad:'costal 40kg', precio:360, stock:310 },
  { id:6, sku:'AVI-002', nombre:'Alimento Avícola Engorda',      cat:'Aves',        unidad:'costal 40kg', precio:340, stock:275 },
  { id:7, sku:'CAP-001', nombre:'Alimento Caprino Lactación',    cat:'Caprinos',    unidad:'costal 25kg', precio:395, stock:60  },
  { id:8, sku:'GRA-001', nombre:'Maíz Rolado',                   cat:'Granos',      unidad:'costal 50kg', precio:285, stock:450 },
  { id:9, sku:'GRA-002', nombre:'Sorgo Molido',                  cat:'Granos',      unidad:'costal 50kg', precio:260, stock:380 },
  { id:10,sku:'SUP-001', nombre:'Pasta de Soya',                 cat:'Suplementos', unidad:'costal 40kg', precio:720, stock:90  },
  { id:11,sku:'SUP-002', nombre:'Melaza de Caña',                cat:'Suplementos', unidad:'cubeta 20L',  precio:180, stock:75  },
  { id:12,sku:'SUP-003', nombre:'Sal Mineral Bovino',            cat:'Suplementos', unidad:'saco 25kg',   precio:420, stock:120 },
]

const CATS = ['Todos','Bovinos','Porcinos','Aves','Caprinos','Granos','Suplementos']

const VENTAS_DEMO = [
  { id:'V-001', cliente:'Rancho La Esperanza',  total:4850, items:10, hora:'10:23', metodo:'Efectivo',     empresa:'19H Tototlán' },
  { id:'V-002', cliente:'Granja Los Pinos',      total:2160, items:6,  hora:'09:45', metodo:'Transferencia',empresa:'19H Guadalajara'},
  { id:'V-003', cliente:'Familia Rodríguez',     total:1440, items:4,  hora:'09:12', metodo:'Efectivo',     empresa:'19H Tototlán' },
  { id:'V-004', cliente:'Engordadora El Pital',  total:8720, items:20, hora:'08:50', metodo:'Crédito',      empresa:'19H Michoacán' },
]

/* ══════════════════════════════════════════
   ICONOS
══════════════════════════════════════════ */
const IC = {
  cart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  box:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  user:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  plus:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  back:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
  grid:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  search:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
}

const FI = ({c,d=0}:{c:React.ReactNode;d?:number}) => (
  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.2,delay:d,ease:'easeOut'}}>{c}</motion.div>
)

/* ══════════════════════════════════════════
   SPLASH
══════════════════════════════════════════ */
function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.4}}
      style={{position:'fixed',inset:0,zIndex:9999,display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center',background:'#C62828'}}>
      <motion.div initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}}
        transition={{duration:0.7,ease:'easeOut'}}
        style={{display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
        <div style={{width:88,height:88,borderRadius:24,background:'rgba(255,255,255,0.15)',
          border:'2px solid rgba(255,255,255,0.35)',display:'flex',alignItems:'center',
          justifyContent:'center',overflow:'hidden'}}>
          <img src="/images/logo_forrajera.png" alt="19H"
            style={{width:'100%',height:'100%',objectFit:'cover'}}
            onError={(e:any) => {
              e.target.style.display='none'
              e.target.nextSibling.style.display='flex'
            }}/>
          <div style={{display:'none',width:'100%',height:'100%',alignItems:'center',
            justifyContent:'center',fontFamily:'Georgia,serif',fontSize:32,
            color:'#fff',fontWeight:700}}>19</div>
        </div>
        <div style={{fontFamily:'Georgia,serif',fontSize:26,color:'#fff',letterSpacing:'0.04em',
          textAlign:'center',lineHeight:1.2}}>
          Forrajera<br/>19 Hermanos
        </div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.65)',textTransform:'uppercase',
          letterSpacing:'0.18em'}}>Sistema de Ventas</div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════
   LANDING — solo si quieren ver el negocio
══════════════════════════════════════════ */
function Landing({ onEntrar }: { onEntrar: () => void }) {
  return (
    <div style={{minHeight:'100svh',background:'#0f0f0f',overflowX:'hidden'}}>
      {/* HERO */}
      <div style={{position:'relative',minHeight:'100svh',display:'flex',
        flexDirection:'column',justifyContent:'flex-end',padding:'0 20px 40px'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="/images/hero_forrajera.jpg" alt="Forrajera"
            style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.45)'}}/>
          <div style={{position:'absolute',inset:0,
            background:'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 70%)'}}/>
        </div>

        <div style={{position:'relative',zIndex:1}}>
          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
            <div style={{width:52,height:52,borderRadius:14,background:'#C62828',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'Georgia,serif',fontSize:22,color:'#fff',fontWeight:700,
              border:'2px solid rgba(255,255,255,0.2)'}}>19</div>
            <div>
              <div style={{fontSize:18,fontWeight:700,color:'#fff'}}>Forrajera 19 Hermanos</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.6)'}}>Tototlán, Jalisco · Desde 2003</div>
            </div>
          </div>

          <h1 style={{fontFamily:'Georgia,serif',fontSize:'clamp(2rem,8vw,3rem)',
            color:'#fff',lineHeight:1.1,marginBottom:16}}>
            Calidad que<br/><span style={{color:'#EF9A9A'}}>Nutre el Campo</span>
          </h1>

          <p style={{fontSize:14,color:'rgba(255,255,255,0.75)',lineHeight:1.6,marginBottom:32,maxWidth:400}}>
            Alimentos balanceados para ganado bovino, porcino, aves y más. 
            Jalisco, Michoacán y toda nuestra región.
          </p>

          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <motion.button whileTap={{scale:0.97}} onClick={onEntrar}
              style={{padding:'16px',borderRadius:14,border:'none',cursor:'pointer',
                background:'#C62828',color:'#fff',fontSize:15,fontWeight:700,
                width:'100%',maxWidth:400,fontFamily:'inherit'}}>
              Iniciar sesión — Empleados
            </motion.button>
            <a href="tel:+523919160449"
              style={{display:'block',padding:'14px',borderRadius:14,
                border:'1.5px solid rgba(255,255,255,0.25)',color:'#fff',
                fontSize:14,fontWeight:600,textAlign:'center',textDecoration:'none',
                width:'100%',maxWidth:400,boxSizing:'border-box'}}>
              📞 391 916 0449
            </a>
          </div>
        </div>
      </div>

      {/* INFO */}
      <div style={{padding:'40px 20px',maxWidth:480,margin:'0 auto'}}>
        <div style={{fontSize:11,color:'#C62828',textTransform:'uppercase',
          letterSpacing:'0.12em',marginBottom:16}}>PRESENCIA NACIONAL</div>
        {EMPRESAS.map((e,i) => (
          <FI key={e.id} d={i*0.08} c={
            <div style={{padding:'14px 16px',borderRadius:14,
              background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.07)',
              marginBottom:10,display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:e.color,flexShrink:0}}/>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:'#f0f0f0'}}>{e.nombre}</div>
                <div style={{fontSize:12,color:'#888'}}>{e.ciudad}</div>
              </div>
            </div>
          }/>
        ))}

        <div style={{marginTop:32,padding:'20px',borderRadius:16,
          background:'rgba(198,40,40,0.08)',border:'1px solid rgba(198,40,40,0.2)'}}>
          <div style={{fontSize:12,color:'#C62828',fontWeight:700,marginBottom:8}}>
            +20 años de experiencia
          </div>
          <div style={{fontSize:13,color:'#888',lineHeight:1.6}}>
            De una familia de 19 hermanos de Tototlán, Jalisco a más de 110 millones de mexicanos. 
            Km. 1.5 carretera Tototlán-Guadalajara.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SELECTOR DE EMPRESA
══════════════════════════════════════════ */
function SelectorEmpresa({ onSelect }: { onSelect: (e: typeof EMPRESAS[0]) => void }) {
  return (
    <div style={{minHeight:'100svh',background:'#0f0f0f',display:'flex',
      flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
        style={{width:'100%',maxWidth:380}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{width:64,height:64,borderRadius:18,background:'#C62828',
            display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',
            fontFamily:'Georgia,serif',fontSize:26,color:'#fff',fontWeight:700}}>19</div>
          <div style={{fontSize:20,fontWeight:700,color:'#f0f0f0',marginBottom:4}}>
            Forrajera 19 Hermanos
          </div>
          <div style={{fontSize:13,color:'#888'}}>Selecciona tu sucursal</div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {EMPRESAS.map((e,i) => (
            <motion.button key={e.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}
              transition={{delay:0.1+i*0.08}} whileTap={{scale:0.97}} onClick={() => onSelect(e)}
              style={{padding:'16px 20px',borderRadius:16,border:`1px solid ${e.color}44`,
                background:`${e.color}11`,cursor:'pointer',textAlign:'left',
                display:'flex',alignItems:'center',justifyContent:'space-between',
                fontFamily:'inherit'}}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:44,height:44,borderRadius:12,background:e.color,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:'Georgia,serif',fontSize:16,color:'#fff',fontWeight:700}}>19</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'#f0f0f0'}}>{e.nombre}</div>
                  <div style={{fontSize:12,color:'#888'}}>{e.ciudad}</div>
                </div>
              </div>
              <div style={{color:'#555',width:20,height:20}}>{IC.back}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════
   POS
══════════════════════════════════════════ */
type CartItem = { producto: typeof PRODUCTOS[0]; cantidad: number }

function POS({ empresa, onBack }: { empresa: typeof EMPRESAS[0]; onBack: () => void }) {
  const [tab, setTab] = useState<'pos'|'ventas'|'inventario'|'admin'>('pos')
  const [cat, setCat] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [showCarrito, setShowCarrito] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [ventaOk, setVentaOk] = useState(false)
  const [metodo, setMetodo] = useState('efectivo')
  const [cliente, setCliente] = useState('')
  const [ventasHoy, setVentasHoy] = useState(VENTAS_DEMO)

  const prodFiltrados = PRODUCTOS.filter(p =>
    (cat === 'Todos' || p.cat === cat) &&
    (!busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.sku.toLowerCase().includes(busqueda.toLowerCase()))
  )

  const totalCarrito = carrito.reduce((a,i) => a + i.producto.precio * i.cantidad, 0)
  const itemsCarrito = carrito.reduce((a,i) => a + i.cantidad, 0)
  const totalHoy = ventasHoy.reduce((a,v) => a + v.total, 0)

  const addToCart = (p: typeof PRODUCTOS[0]) =>
    setCarrito(prev => {
      const ex = prev.find(i => i.producto.id === p.id)
      if (ex) return prev.map(i => i.producto.id === p.id ? {...i,cantidad:i.cantidad+1} : i)
      return [...prev, {producto:p, cantidad:1}]
    })

  const updateQty = (id:number, delta:number) =>
    setCarrito(prev => prev.map(i => i.producto.id===id ? {...i,cantidad:Math.max(0,i.cantidad+delta)} : i).filter(i=>i.cantidad>0))

  const confirmarVenta = () => {
    const nuevaVenta = {
      id: `V-${String(ventasHoy.length+1).padStart(3,'0')}`,
      cliente: cliente || 'Cliente mostrador',
      total: totalCarrito,
      items: itemsCarrito,
      hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'}),
      metodo: metodo === 'efectivo' ? 'Efectivo' : metodo === 'transferencia' ? 'Transferencia' : 'Crédito',
      empresa: empresa.nombre,
    }
    setVentasHoy(prev => [nuevaVenta,...prev])
    setShowConfirm(false)
    setVentaOk(true)
    setTimeout(() => {
      setVentaOk(false)
      setCarrito([])
      setShowCarrito(false)
      setCliente('')
    }, 2500)
  }

  const BRAND = empresa.color

  const TABS = [
    {id:'pos',       l:'Venta',     icon:IC.cart  },
    {id:'ventas',    l:'Historial', icon:IC.chart },
    {id:'inventario',l:'Productos', icon:IC.box   },
    {id:'admin',     l:'Admin',     icon:IC.grid  },
  ] as const

  return (
    <>
      {/* VENTA OK */}
      <AnimatePresence>
        {ventaOk && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,0.95)',
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
            <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',damping:15}}>
              <div style={{width:80,height:80,borderRadius:'50%',background:BRAND,
                display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',width:80,height:80}}>
                <div style={{width:36,height:36}}>{IC.check}</div>
              </div>
            </motion.div>
            <div style={{fontSize:22,fontWeight:700,color:'#fff'}}>¡Venta registrada!</div>
            <div style={{fontFamily:'Georgia,serif',fontSize:32,color:BRAND}}>
              ${totalCarrito.toLocaleString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CARRITO */}
      <AnimatePresence>
        {showCarrito && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.8)',
              backdropFilter:'blur(4px)',display:'flex',alignItems:'flex-end'}}
            onClick={() => setShowCarrito(false)}>
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}}
              transition={{type:'spring',damping:28,stiffness:280}}
              style={{width:'100%',maxWidth:480,margin:'0 auto',background:'#1a1a1a',
                borderRadius:'24px 24px 0 0',maxHeight:'88svh',overflow:'hidden',
                display:'flex',flexDirection:'column'}}
              onClick={e => e.stopPropagation()}>

              <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',
                display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:'#f0f0f0'}}>Ticket de venta</div>
                  <div style={{fontSize:12,color:'#888'}}>{itemsCarrito} productos</div>
                </div>
                <button onClick={() => setShowCarrito(false)}
                  style={{width:32,height:32,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.1)',
                    background:'rgba(255,255,255,0.05)',cursor:'pointer',color:'#888',
                    display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{width:14,height:14}}>{IC.close}</div>
                </button>
              </div>

              {/* Cliente */}
              <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,0.05)',flexShrink:0}}>
                <input placeholder="Nombre del cliente (opcional)" value={cliente}
                  onChange={e => setCliente(e.target.value)}
                  style={{width:'100%',padding:'10px 14px',borderRadius:10,
                    border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',
                    color:'#f0f0f0',fontSize:13,outline:'none',boxSizing:'border-box',fontFamily:'inherit'}}/>
              </div>

              {/* Items */}
              <div style={{overflowY:'auto',flex:1,padding:'8px 0'}}>
                {carrito.map(item => (
                  <div key={item.producto.id} style={{padding:'10px 20px',display:'flex',
                    alignItems:'center',justifyContent:'space-between',
                    borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#f0f0f0',
                        overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        {item.producto.nombre}
                      </div>
                      <div style={{fontSize:11,color:'#888'}}>{item.producto.unidad} · ${item.producto.precio.toLocaleString()} c/u</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
                      <button onClick={() => updateQty(item.producto.id,-1)}
                        style={{width:28,height:28,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.15)',
                          background:'transparent',cursor:'pointer',color:'#f0f0f0',
                          display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div style={{width:14,height:14}}>{IC.minus}</div>
                      </button>
                      <span style={{color:'#f0f0f0',fontWeight:700,width:24,textAlign:'center'}}>{item.cantidad}</span>
                      <button onClick={() => updateQty(item.producto.id,1)}
                        style={{width:28,height:28,borderRadius:'50%',border:'none',
                          background:BRAND,cursor:'pointer',color:'#fff',
                          display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div style={{width:14,height:14}}>{IC.plus}</div>
                      </button>
                      <span style={{color:'#f0f0f0',fontWeight:700,fontSize:13,minWidth:64,textAlign:'right'}}>
                        ${(item.producto.precio*item.cantidad).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pago */}
              <div style={{padding:20,borderTop:'1px solid rgba(255,255,255,0.1)',flexShrink:0}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                  <span style={{color:'#888',fontSize:14}}>Total</span>
                  <span style={{fontFamily:'Georgia,serif',fontSize:28,fontWeight:700,color:'#f0f0f0'}}>
                    ${totalCarrito.toLocaleString()}
                  </span>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:14}}>
                  {[['efectivo','💵','Efectivo'],['transferencia','🏦','Transfer.'],['credito','📋','Crédito']].map(([m,e,l]) => (
                    <button key={m} onClick={() => setMetodo(m)}
                      style={{padding:'9px 4px',borderRadius:10,fontSize:11,fontWeight:600,
                        cursor:'pointer',fontFamily:'inherit',
                        border:`1.5px solid ${metodo===m ? BRAND : 'rgba(255,255,255,0.1)'}`,
                        background:metodo===m ? `${BRAND}22` : 'transparent',
                        color:metodo===m ? BRAND : '#666'}}>
                      {e} {l}
                    </button>
                  ))}
                </div>
                <motion.button whileTap={{scale:0.97}} onClick={() => setShowConfirm(true)}
                  style={{width:'100%',padding:'14px',borderRadius:14,border:'none',
                    cursor:'pointer',background:BRAND,color:'#fff',fontSize:15,fontWeight:700,
                    fontFamily:'inherit'}}>
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
            style={{position:'fixed',inset:0,zIndex:400,background:'rgba(0,0,0,0.9)',
              display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
            <motion.div initial={{scale:0.9}} animate={{scale:1}}
              style={{background:'#1a1a1a',borderRadius:24,padding:32,
                maxWidth:340,width:'100%',textAlign:'center'}}>
              <div style={{fontSize:36,marginBottom:12}}>🧾</div>
              <div style={{fontSize:18,fontWeight:700,color:'#f0f0f0',marginBottom:6}}>Confirmar venta</div>
              <div style={{color:'#888',fontSize:13,marginBottom:4}}>{cliente||'Cliente mostrador'}</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:36,color:BRAND,fontWeight:700,marginBottom:24}}>
                ${totalCarrito.toLocaleString()}
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={() => setShowConfirm(false)}
                  style={{flex:1,padding:14,borderRadius:12,border:'1px solid rgba(255,255,255,0.15)',
                    background:'transparent',color:'#f0f0f0',cursor:'pointer',fontSize:14,fontFamily:'inherit'}}>
                  Cancelar
                </button>
                <motion.button whileTap={{scale:0.97}} onClick={confirmarVenta}
                  style={{flex:2,padding:14,borderRadius:12,border:'none',
                    background:BRAND,color:'#fff',cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:'inherit'}}>
                  ✓ Confirmar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* APP */}
      <div style={{minHeight:'100svh',background:'#0f0f0f',paddingBottom:80}}>

        {/* HEADER */}
        <div style={{position:'sticky',top:0,zIndex:50,padding:'12px 16px',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          background:'rgba(15,15,15,0.95)',backdropFilter:'blur(16px)',
          borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <button onClick={onBack} style={{width:34,height:34,borderRadius:10,
              border:'1px solid rgba(255,255,255,0.1)',background:'transparent',
              cursor:'pointer',color:'#888',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:16,height:16}}>{IC.back}</div>
            </button>
            <div style={{width:8,height:8,borderRadius:'50%',background:BRAND}}/>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#f0f0f0'}}>{empresa.nombre}</div>
              <div style={{fontSize:10,color:'#888'}}>{empresa.ciudad}</div>
            </div>
          </div>
          {itemsCarrito > 0 && tab === 'pos' && (
            <motion.button initial={{scale:0}} animate={{scale:1}} whileTap={{scale:0.95}}
              onClick={() => setShowCarrito(true)}
              style={{position:'relative',padding:'8px 16px',borderRadius:999,border:'none',
                cursor:'pointer',background:BRAND,color:'#fff',fontSize:13,fontWeight:700,
                display:'flex',alignItems:'center',gap:6}}>
              <div style={{width:16,height:16}}>{IC.cart}</div>
              ${totalCarrito.toLocaleString()}
              <div style={{position:'absolute',top:-4,right:-4,width:18,height:18,
                borderRadius:'50%',background:'#fff',color:BRAND,fontSize:10,fontWeight:800,
                display:'flex',alignItems:'center',justifyContent:'center'}}>{itemsCarrito}</div>
            </motion.button>
          )}
        </div>

        {/* POS */}
        {tab === 'pos' && (
          <div style={{padding:'12px 16px'}}>
            {/* Buscar */}
            <FI d={0} c={
              <div style={{position:'relative',marginBottom:12}}>
                <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',
                  width:16,height:16,color:'#555'}}>{IC.search}</div>
                <input placeholder="Buscar producto o SKU..." value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  style={{width:'100%',padding:'10px 10px 10px 36px',borderRadius:12,
                    border:'1px solid rgba(255,255,255,0.08)',background:'#1a1a1a',
                    color:'#f0f0f0',fontSize:13,outline:'none',boxSizing:'border-box',fontFamily:'inherit'}}/>
              </div>
            }/>

            {/* Categorías */}
            <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:8,marginBottom:12,
              scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)}
                  style={{flexShrink:0,padding:'6px 14px',borderRadius:999,fontSize:12,
                    fontWeight:600,cursor:'pointer',fontFamily:'inherit',whiteSpace:'nowrap',
                    border:`1px solid ${cat===c ? BRAND : 'rgba(255,255,255,0.1)'}`,
                    background:cat===c ? `${BRAND}22` : 'transparent',
                    color:cat===c ? BRAND : '#666'}}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grid productos */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {prodFiltrados.map((p,i) => {
                const enCarrito = carrito.find(c => c.producto.id === p.id)
                return (
                  <FI key={p.id} d={i*0.03} c={
                    <motion.div whileTap={{scale:0.96}} onClick={() => addToCart(p)}
                      style={{background:enCarrito ? `${BRAND}12` : '#1a1a1a',
                        border:`1px solid ${enCarrito ? BRAND+'44' : 'rgba(255,255,255,0.07)'}`,
                        borderRadius:16,padding:14,cursor:'pointer'}}>
                      <div style={{display:'flex',justifyContent:'space-between',
                        alignItems:'flex-start',marginBottom:8}}>
                        <span style={{fontSize:9,color:'#555',textTransform:'uppercase',
                          letterSpacing:'0.08em'}}>{p.sku}</span>
                        {enCarrito && (
                          <div style={{width:20,height:20,borderRadius:'50%',background:BRAND,
                            display:'flex',alignItems:'center',justifyContent:'center',
                            fontSize:10,color:'#fff',fontWeight:800}}>
                            {enCarrito.cantidad}
                          </div>
                        )}
                      </div>
                      <div style={{fontSize:13,fontWeight:600,color:'#f0f0f0',lineHeight:1.3,
                        marginBottom:4,display:'-webkit-box',WebkitLineClamp:2,
                        WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                        {p.nombre}
                      </div>
                      <div style={{fontSize:10,color:'#666',marginBottom:10}}>{p.unidad}</div>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{fontFamily:'Georgia,serif',fontSize:16,fontWeight:700,color:BRAND}}>
                          ${p.precio.toLocaleString()}
                        </span>
                        <div style={{width:28,height:28,borderRadius:'50%',background:BRAND,
                          display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
                          <div style={{width:14,height:14}}>{IC.plus}</div>
                        </div>
                      </div>
                    </motion.div>
                  }/>
                )
              })}
            </div>
          </div>
        )}

        {/* HISTORIAL */}
        {tab === 'ventas' && (
          <div style={{padding:'12px 16px'}}>
            <FI d={0} c={
              <>
                <div style={{fontSize:11,color:'#888',textTransform:'uppercase',
                  letterSpacing:'0.1em',marginBottom:4}}>VENTAS DEL DÍA</div>
                <div style={{fontFamily:'Georgia,serif',fontSize:28,color:BRAND,
                  fontWeight:700,marginBottom:20}}>
                  ${totalHoy.toLocaleString()}
                </div>
              </>
            }/>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {ventasHoy.map((v,i) => (
                <FI key={v.id} d={i*0.05} c={
                  <div style={{background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:14,padding:'13px 16px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <div style={{fontSize:14,fontWeight:600,color:'#f0f0f0'}}>{v.cliente}</div>
                        <div style={{fontSize:11,color:'#888'}}>{v.id} · {v.items} prod · {v.hora} · {v.metodo}</div>
                        <div style={{fontSize:10,color:'#666',marginTop:2}}>{v.empresa}</div>
                      </div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:16,fontWeight:700,color:BRAND}}>
                        ${v.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                }/>
              ))}
            </div>
          </div>
        )}

        {/* INVENTARIO */}
        {tab === 'inventario' && (
          <div style={{padding:'12px 16px'}}>
            <FI d={0} c={
              <div style={{fontSize:11,color:'#888',textTransform:'uppercase',
                letterSpacing:'0.1em',marginBottom:14}}>
                {PRODUCTOS.length} PRODUCTOS EN CATÁLOGO
              </div>
            }/>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {PRODUCTOS.map((p,i) => (
                <FI key={p.id} d={i*0.03} c={
                  <div style={{background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:12,padding:'12px 16px',
                    display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'#f0f0f0'}}>{p.nombre}</div>
                      <div style={{fontSize:11,color:'#888'}}>{p.sku} · {p.unidad}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:14,fontWeight:700,color:BRAND}}>${p.precio.toLocaleString()}</div>
                      <div style={{fontSize:11,color:p.stock<80?'#FF9800':'#4CAF50'}}>{p.stock} disponibles</div>
                    </div>
                  </div>
                }/>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {tab === 'admin' && (
          <div style={{padding:'12px 16px'}}>
            <FI d={0} c={
              <>
                <div style={{fontSize:11,color:'#888',textTransform:'uppercase',
                  letterSpacing:'0.1em',marginBottom:16}}>RESUMEN GENERAL</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                  {[
                    {l:'Ventas hoy',    v:`$${totalHoy.toLocaleString()}`,  c:BRAND},
                    {l:'Transacciones', v:ventasHoy.length.toString(),       c:'#f0f0f0'},
                    {l:'Productos',     v:PRODUCTOS.length.toString(),        c:'#FF9800'},
                    {l:'Sucursales',    v:'3',                                c:'#4CAF50'},
                  ].map((s,i) => (
                    <div key={i} style={{background:'#1a1a1a',borderRadius:14,padding:'16px',
                      border:'1px solid rgba(255,255,255,0.07)'}}>
                      <div style={{fontSize:11,color:'#888',marginBottom:6}}>{s.l}</div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:24,color:s.c,fontWeight:700}}>{s.v}</div>
                    </div>
                  ))}
                </div>

                <div style={{fontSize:11,color:'#888',textTransform:'uppercase',
                  letterSpacing:'0.1em',marginBottom:12}}>POR SUCURSAL HOY</div>
                {EMPRESAS.map((e,i) => {
                  const vs = ventasHoy.filter(v => v.empresa === e.nombre)
                  const tot = vs.reduce((a,v) => a+v.total, 0)
                  return (
                    <div key={e.id} style={{background:'#1a1a1a',borderRadius:12,
                      padding:'13px 16px',marginBottom:8,
                      border:`1px solid rgba(255,255,255,0.07)`,
                      display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:10,height:10,borderRadius:'50%',background:e.color}}/>
                        <div>
                          <div style={{fontSize:13,fontWeight:600,color:'#f0f0f0'}}>{e.nombre}</div>
                          <div style={{fontSize:11,color:'#888'}}>{vs.length} ventas hoy</div>
                        </div>
                      </div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:16,fontWeight:700,color:e.color}}>
                        ${tot.toLocaleString()}
                      </div>
                    </div>
                  )
                })}
              </>
            }/>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,
        background:'rgba(15,15,15,0.97)',backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'flex',alignItems:'center',zIndex:100}}>
        {TABS.map(({id,l,icon}) => (
          <motion.button key={id} onClick={() => setTab(id)} whileTap={{scale:0.9}}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,
              padding:'8px 0',border:'none',cursor:'pointer',background:'transparent',
              color:tab===id ? BRAND : '#444',fontSize:10,
              textTransform:'uppercase',letterSpacing:'0.04em',minHeight:44,fontFamily:'inherit'}}>
            <div style={{width:22,height:22}}>{icon}</div>
            <span>{l}</span>
          </motion.button>
        ))}
      </nav>
    </>
  )
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function ForrajeraApp() {
  const [step, setStep] = useState<'splash'|'landing'|'selector'|'pos'>('splash')
  const [empresa, setEmpresa] = useState<typeof EMPRESAS[0]|null>(null)

  return (
    <AnimatePresence mode="wait">
      {step === 'splash' && (
        <motion.div key="splash" exit={{opacity:0}}>
          <Splash onDone={() => setStep('landing')}/>
        </motion.div>
      )}
      {step === 'landing' && (
        <motion.div key="landing" initial={{opacity:0}} animate={{opacity:1}}>
          <Landing onEntrar={() => setStep('selector')}/>
        </motion.div>
      )}
      {step === 'selector' && (
        <motion.div key="selector" initial={{opacity:0}} animate={{opacity:1}}>
          <SelectorEmpresa onSelect={(e) => { setEmpresa(e); setStep('pos') }}/>
        </motion.div>
      )}
      {step === 'pos' && empresa && (
        <motion.div key="pos" initial={{opacity:0}} animate={{opacity:1}}>
          <POS empresa={empresa} onBack={() => setStep('selector')}/>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
