import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import "./index.css";
import "./premium-upgrades.css";

const IMG = {
  terracotta: "/images/handmade-terracotta.jpg",
  blue: "/images/hero-vase.jpg",
  indigo: "/images/handmade-indigo-bowls.jpg",
  bowls: "/images/handmade-bowls.jpg",
  sculptural: "/images/handmade-sculptural-vase.jpg",
};

const VIDEOS = {
  craft: "/videos/ozabay-craft-film.mp4",
  detail: "/videos/ozabay-detail-film.mp4",
  artisanA: "https://videos.pexels.com/video-files/37306917/15802972_1920_1080_25fps.mp4",
  artisanB: "https://videos.pexels.com/video-files/9363486/9363486-hd_1920_1080_25fps.mp4",
};

const PRODUCTS = [
  ["Mitti Sculptural Vase","Ceramics",3800,IMG.terracotta,"Jaipur","Meera Kumari"],
  ["Jaipur Blue Pottery Vase","Blue Pottery",6900,IMG.blue,"Jaipur","Aarav Khan"],
  ["Neel Indigo Bowl Set","Ceramics",4200,IMG.indigo,"Khurja","Farida Ansari"],
  ["Mitti Hand-Finished Bowl","Ceramics",3250,IMG.bowls,"Jaipur","Meera Kumari"],
  ["Rekh Artisan Bowl","Ceramics",1650,IMG.bowls,"Khurja","Raghav Sharma"],
  ["Aaroh Sculptural Vessel","Terracotta",2950,IMG.sculptural,"Molela","Devendra Prajapat"],
  ["Surya Blue Serving Platter","Blue Pottery",4800,IMG.blue,"Jaipur","Aarav Khan"],
  ["Neel Lotus Dessert Plate","Blue Pottery",2200,IMG.blue,"Jaipur","Aarav Khan"],
  ["Gulabi Hand-Painted Jar","Blue Pottery",3600,IMG.blue,"Jaipur","Meera Kumari"],
  ["Chandni Indigo Carafe","Ceramics",3900,IMG.indigo,"Khurja","Farida Ansari"],
  ["Dhoop Terracotta Planter","Terracotta",2400,IMG.terracotta,"Molela","Devendra Prajapat"],
  ["Mitti Ripple Planter","Terracotta",2800,IMG.sculptural,"Molela","Devendra Prajapat"],
  ["Kansa Dawn Tumbler Set","Metalcraft",5200,IMG.blue,"Moradabad","Raghav Sharma"],
  ["Rekh Hammered Brass Bowl","Metalcraft",4400,IMG.terracotta,"Moradabad","Raghav Sharma"],
  ["Suraj Brass Candle Holder","Metalcraft",3100,IMG.sculptural,"Moradabad","Raghav Sharma"],
  ["Noor Kansa Thali","Metalcraft",7600,IMG.bowls,"Moradabad","Raghav Sharma"],
  ["Ganga Handloom Runner","Textiles",2850,IMG.indigo,"Varanasi","Farida Ansari"],
  ["Mogra Block-Print Cushion","Textiles",1450,IMG.bowls,"Jaipur","Sana Sheikh"],
  ["Neel Indigo Table Runner","Textiles",2350,IMG.indigo,"Bagru","Sana Sheikh"],
  ["Kashvi Handwoven Throw","Textiles",4900,IMG.sculptural,"Kutch","Farida Ansari"],
  ["Rangrez Cotton Napkin Set","Textiles",1250,IMG.indigo,"Bagru","Sana Sheikh"],
  ["Gulnaar Loom Cushion Pair","Textiles",2100,IMG.bowls,"Varanasi","Farida Ansari"],
  ["Neem Carved Serving Board","Woodcraft",3300,IMG.terracotta,"Saharanpur","Imran Qureshi"],
  ["Aranya Teak Tray","Woodcraft",4200,IMG.sculptural,"Saharanpur","Imran Qureshi"],
  ["Koyal Carved Candle Stand","Woodcraft",1950,IMG.bowls,"Saharanpur","Imran Qureshi"],
  ["Vanam Wooden Bowl","Woodcraft",2700,IMG.terracotta,"Kerala","Anil Menon"],
  ["Sandalwood Keepsake Box","Woodcraft",3650,IMG.blue,"Mysuru","Anil Menon"],
  ["Kashish Carved Mirror Frame","Woodcraft",5800,IMG.sculptural,"Saharanpur","Imran Qureshi"],
  ["Aangan Stoneware Lamp","Home Décor",6200,IMG.sculptural,"Khurja","Farida Ansari"],
  ["Chaand Ceramic Incense Holder","Home Décor",1350,IMG.bowls,"Jaipur","Meera Kumari"],
  ["Raat Indigo Table Lamp","Home Décor",5400,IMG.indigo,"Khurja","Farida Ansari"],
  ["Mitti Sculptural Candle Trio","Home Décor",2400,IMG.terracotta,"Molela","Devendra Prajapat"],
  ["Gulab Stoneware Vase","Home Décor",4550,IMG.blue,"Khurja","Meera Kumari"],
  ["Aaranya Reed Basket","Home Décor",3150,IMG.bowls,"Assam","Sana Sheikh"],
  ["Neel Hand-Painted Urn","Home Décor",5900,IMG.blue,"Jaipur","Aarav Khan"],
  ["Dastkaar Wall Plate","Home Décor",2750,IMG.sculptural,"Jaipur","Meera Kumari"],
  ["Mitti Hand-Thrown Urn","Ceramics",4100,IMG.terracotta,"Jaipur","Meera Kumari"],
  ["Jal Neel Lotus Bowl","Blue Pottery",2950,IMG.blue,"Jaipur","Aarav Khan"],
  ["Moradabad Hammered Lota","Metalcraft",3950,IMG.terracotta,"Moradabad","Raghav Sharma"],
  ["Molela Earth Planter","Terracotta",2600,IMG.terracotta,"Molela","Devendra Prajapat"],
  ["Molela Sun Vessel","Terracotta",3450,IMG.sculptural,"Molela","Devendra Prajapat"],
].map(([name,category,price,image,city,artisan],i)=>({
  id:i+1,name,category,priceValue:price,price:`₹${price.toLocaleString("en-IN")}`,image,city,artisan,
  material:category === "Metalcraft" ? "Brass / Kansa" : category === "Textiles" ? "Handwoven cotton" : category === "Woodcraft" ? "Indian hardwood" : category === "Terracotta" ? "Fired earth" : category === "Home Décor" ? "Mixed natural materials" : "Ceramic clay",
  description:"A small-batch handmade piece from an independent Indian maker. Natural variation is part of its character.",
  rating:(4.6+(i%4)*0.1).toFixed(1),
  dimensions:["12 × 8 in","10 × 10 in","16 × 16 in"][i%3],
  care:category === "Textiles" ? "Gentle dry clean" : "Wipe with a soft dry cloth",
  story:`Shaped in ${city} and finished by ${artisan}. The piece carries small marks of the hand, making every edition subtly different.`,
}));

const COLLECTIONS = [
  {id:"ceramics",name:"Ceramics",filter:"Ceramics",image:IMG.bowls,copy:"Quiet forms, hand-finished in small studios."},
  {id:"blue-pottery",name:"Blue Pottery",filter:"Blue Pottery",image:IMG.blue,copy:"Jaipur colour, contemporary silhouettes."},
  {id:"metalcraft",name:"Metalcraft",filter:"Metalcraft",image:IMG.terracotta,copy:"Hammer marks, warm brass and Kansa."},
  {id:"terracotta",name:"Terracotta",filter:"Terracotta",image:IMG.terracotta,copy:"Fired earth, sculpted and left honest."},
  {id:"textiles",name:"Textiles",filter:"Textiles",image:IMG.indigo,copy:"Loom-made textures for slower rooms."},
  {id:"woodcraft",name:"Woodcraft",filter:"Woodcraft",image:IMG.sculptural,copy:"Carved grain and useful forms."},
  {id:"home-decor",name:"Home Décor",filter:"Home Décor",image:IMG.terracotta,copy:"Small objects that change the atmosphere."},
];

const ARTISANS = [
  {id:"meera",name:"Meera Kumari",craft:"Blue Pottery · Jaipur",city:"Jaipur, Rajasthan",story:"A contemporary blue-pottery maker building on a family studio practice, with each motif painted by hand.",image:"https://images.pexels.com/photos/19179113/pexels-photo-19179113.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Blue Pottery",portraitNote:"Representative artisan workshop portrait"},
  {id:"raghav",name:"Raghav Sharma",craft:"Brass & Kansa · Moradabad",city:"Moradabad, Uttar Pradesh",story:"A metalworker who keeps the rhythm of hand-hammering visible in every small-batch vessel.",image:"https://images.pexels.com/photos/25945094/pexels-photo-25945094.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Metalcraft",portraitNote:"Representative artisan workshop portrait"},
  {id:"sana",name:"Sana Sheikh",craft:"Block Print · Jaipur",city:"Jaipur, Rajasthan",story:"A textile artist working with carved blocks, layered dyes and naturally inspired palettes.",image:"https://images.pexels.com/photos/7037689/pexels-photo-7037689.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Textiles",portraitNote:"Representative artisan workshop portrait"},
  {id:"devendra",name:"Devendra Prajapat",craft:"Terracotta · Molela",city:"Molela, Rajasthan",story:"A terracotta sculptor working with local earth and traditional firing methods to create contemporary vessels.",image:"https://images.pexels.com/photos/20887995/pexels-photo-20887995.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Terracotta",portraitNote:"Representative artisan workshop portrait"},
  {id:"imran",name:"Imran Qureshi",craft:"Woodcraft · Saharanpur",city:"Saharanpur, Uttar Pradesh",story:"A wood carver balancing useful everyday forms with detailed hand-carved surfaces.",image:"https://images.pexels.com/photos/37011185/pexels-photo-37011185.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Woodcraft",portraitNote:"Representative artisan workshop portrait"},
  {id:"farida",name:"Farida Ansari",craft:"Stoneware & Loom · Khurja",city:"Khurja, Uttar Pradesh",story:"A maker combining tactile stoneware with textile traditions for quiet, contemporary homes.",image:"https://images.pexels.com/photos/31019536/pexels-photo-31019536.jpeg?auto=compress&cs=tinysrgb&w=1200",products:"Ceramics",portraitNote:"Representative artisan workshop portrait"},
];

const REVIEWS=[
  ["Aarohi S.","The blue pottery piece feels genuinely handmade and the finish is even better in person.",5],
  ["Kabir M.","The 3D view made it much easier to understand the scale before adding it to my bag.",5],
  ["Naina P.","Beautiful packaging concept and a very thoughtful maker story.",4],
];

const CUSTOM_PRICES={form:{Vessel:3200,Bowl:2400,Lamp:4800,Planter:2800},material:{Clay:0,Stoneware:700,Brass:1900,Wood:900},finish:{Natural:0,Speckled:350,Indigo:500,"Hand-painted":900},size:{Small:0,Medium:700,Large:1500},tone:{Earth:0,Indigo:150,Sand:100,Forest:200}};

function money(v){return `₹${v.toLocaleString("en-IN")}`;}
function Reveal({children,className="",id}){const ref=useRef(null);useEffect(()=>{const el=ref.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("is-visible");obs.disconnect();}}, {threshold:.06});obs.observe(el);return()=>obs.disconnect();},[]);return <div ref={ref} id={id} className={`reveal ${className}`}>{children}</div>}
function TiltCard({children,className=""}){const [tilt,setTilt]=useState({x:0,y:0});return <div className={`tilt-card ${className}`} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect();setTilt({x:((e.clientX-r.left)/r.width-.5)*5,y:((e.clientY-r.top)/r.height-.5)*-5})}} onMouseLeave={()=>setTilt({x:0,y:0})} style={{transform:`perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`}}>{children}</div>}
function BuilderGroup({label,value,options,onChange}){return <div className="builder-group"><span>{label}</span><div>{options.map(o=><button key={o} type="button" className={value===o?"is-selected":""} onClick={()=>onChange(o)}>{o}</button>)}</div></div>}

function CustomLivePreview({custom,price,image,onPrice}){
  const [rotation,setRotation]=useState(0);
  const [zoom,setZoom]=useState(1);
  const [drag,setDrag]=useState(null);
  const formImage={Vessel:IMG.sculptural,Bowl:IMG.bowls,Lamp:IMG.indigo,Planter:IMG.terracotta}[custom.form]||image;
  const formClass=custom.form.toLowerCase();
  const materialClass=custom.material.toLowerCase();
  const finishClass=custom.finish.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  const toneClass=custom.tone.toLowerCase();
  const startDrag=e=>{e.currentTarget.setPointerCapture?.(e.pointerId);setDrag({x:e.clientX,start:rotation})};
  const moveDrag=e=>{if(!drag)return;setRotation(drag.start+(e.clientX-drag.x)*0.22)};
  const stopDrag=()=>setDrag(null);
  const sizeLabel={Small:"Compact",Medium:"Balanced",Large:"Statement"}[custom.size];
  return <div className="custom-live-preview">
    <div className="custom-preview-topline"><span><i/> LIVE PREVIEW</span><small>Updates as you customize</small></div>
    <div className={`custom-preview-stage form-${formClass} material-${materialClass} finish-${finishClass} tone-${toneClass}`} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onWheel={e=>setZoom(z=>Math.max(.82,Math.min(1.22,z+(e.deltaY<0?.04:-.04))))}>
      <div className="custom-preview-light"/>
      <div className="custom-preview-product" style={{transform:`translate(-50%,-50%) scale(${zoom*(custom.size==="Small"?.88:custom.size==="Large"?1.1:1)}) rotateY(${rotation}deg)`}}>
        <div className="custom-preview-backdrop"/>
        <img src={formImage} alt={`${custom.form} custom preview`} draggable="false"/>
        <div className="custom-material-overlay"/>
        <div className="custom-finish-overlay"/>
        {custom.engraving.trim()&&<div className="custom-engraving-preview">{custom.engraving}</div>}
      </div>
      <div className="custom-preview-ground"/>
      <div className="custom-preview-controls"><button type="button" onClick={()=>setZoom(z=>Math.min(1.22,z+.08))}>+</button><button type="button" onClick={()=>setRotation(0)}>Reset</button><button type="button" onClick={()=>setZoom(z=>Math.max(.82,z-.08))}>−</button></div>
      <span className="custom-preview-drag">Drag to inspect · scroll to zoom</span>
      <div className="custom-preview-spec"><span>{custom.form}</span><b>{custom.material}</b><em>{custom.finish}</em></div>
    </div>
    <div className="custom-preview-summary">
      <div><span>YOUR CONFIGURATION</span><strong>{custom.form} · {sizeLabel}</strong></div>
      <div className="custom-preview-price"><small>Estimated from</small><strong>{money(price)}</strong></div>
    </div>
    <div className="custom-preview-note"><span>Visual concept preview</span><p>Colours, finish and proportions update here. Handmade texture and small variations may differ slightly in the final piece.</p></div>
  </div>
}

function GiftBuilder({gift,setGift,onCreate}){
  const budgetMax={"₹5,000":5000,"₹10,000":10000,"₹20,000+":20000}[gift.budget]||5000;
  const styleCategories={
    Earthy:["Terracotta","Ceramics","Woodcraft"],
    Indigo:["Blue Pottery","Textiles","Ceramics"],
    "Warm metal":["Metalcraft","Woodcraft","Home Décor"],
    Textured:["Textiles","Woodcraft","Home Décor"],
  };
  const pool=PRODUCTS.filter(p=>styleCategories[gift.style]?.includes(p.category));
  const ranked=pool.slice().sort((a,b)=>{
    const da=Math.abs(budgetMax/Math.max(1,3)-a.priceValue);
    const db=Math.abs(budgetMax/Math.max(1,3)-b.priceValue);
    return da-db;
  });
  const selected=[];
  let total=0;
  for(const item of ranked){
    if(selected.length>=3) break;
    if(total+item.priceValue<=budgetMax || selected.length===0){selected.push(item);total+=item.priceValue;}
  }
  const display=selected.length?selected:ranked.slice(0,3);
  const displayTotal=display.reduce((n,p)=>n+p.priceValue,0);
  const remaining=Math.max(0,budgetMax-displayTotal);
  const setGiftValue=(key,value)=>setGift(g=>({...g,[key]:value}));
  return <section className="oz-section gift-section" id="gifting">
    <div className="oz-container">
      <div className="gift-builder-head">
        <div><p className="eyebrow">OzaBay Gift Builder</p><h2>Give something <em>with a story.</em></h2><p>Build a thoughtful handmade edit in a few choices. OzaBay recommends pieces that fit your occasion, recipient, style and budget.</p></div>
        <div className="gift-builder-flow"><span><b>01</b> Occasion</span><i>→</i><span><b>02</b> Recipient</span><i>→</i><span><b>03</b> Style & budget</span><i>→</i><span><b>04</b> Gift edit</span></div>
      </div>
      <div className="gift-builder-grid">
        <div className="gift-builder-controls">
          <div className="gift-builder-step"><span>01 · THE MOMENT</span><strong>What are you celebrating?</strong><BuilderGroup label="Occasion" value={gift.occasion} options={["Housewarming","Wedding","Festive","Thank you","Anniversary"]} onChange={v=>setGiftValue("occasion",v)}/></div>
          <div className="gift-builder-step"><span>02 · THE PERSON</span><strong>Who is it for?</strong><BuilderGroup label="Recipient" value={gift.recipient} options={["Partner","Parents","Friend","Couple","Client","Myself"]} onChange={v=>setGiftValue("recipient",v)}/></div>
          <div className="gift-builder-step"><span>03 · THE FEELING</span><strong>Choose the visual language.</strong><BuilderGroup label="Style" value={gift.style} options={["Earthy","Indigo","Warm metal","Textured"]} onChange={v=>setGiftValue("style",v)}/><BuilderGroup label="Budget" value={gift.budget} options={["₹5,000","₹10,000","₹20,000+"]} onChange={v=>setGiftValue("budget",v)}/></div>
          <div className="gift-builder-step"><span>04 · THE FINISH</span><strong>Add the thoughtful details.</strong><div className="gift-option-row"><label><span>Gift wrap</span><button type="button" className={gift.wrapping?"is-on":""} onClick={()=>setGiftValue("wrapping",!gift.wrapping)}>{gift.wrapping?"Included":"Add wrapping"}</button></label><label><span>Gift message</span><input value={gift.message} maxLength="90" onChange={e=>setGiftValue("message",e.target.value)} placeholder="A short note for them…"/></label></div></div>
          <div className="gift-builder-actions"><div><small>Estimated edit</small><strong>{money(displayTotal)}</strong><span>{display.length} handmade {display.length===1?"piece":"pieces"} · {remaining?`${money(remaining)} under budget`:"at budget"}</span></div><button className="hero-action" onClick={()=>onCreate(display,displayTotal)}>Create my gift edit ↗</button></div>
        </div>
        <div className="gift-builder-preview">
          <div className="gift-preview-stage">
            <div className="gift-preview-glow"/>
            <div className="gift-preview-products">{display.map((p,i)=><div className={`gift-preview-product gift-preview-product--${i+1}`} key={p.id}><img src={p.image} alt={p.name}/><span>{i+1}</span></div>)}</div>
            <div className="gift-preview-copy"><span>OZABAY GIFT EDIT</span><strong>{gift.occasion}</strong><p>{gift.style} · {gift.recipient}</p></div>
            <div className="gift-preview-badge"><span>LIVE EDIT</span><strong>{money(displayTotal)}</strong></div>
          </div>
          <div className="gift-preview-meta"><div><span>Curated for</span><strong>{gift.recipient}</strong></div><div><span>Style</span><strong>{gift.style}</strong></div><div><span>Budget</span><strong>{gift.budget}</strong></div></div>
          <div className="gift-preview-note"><span>What happens next</span><p>Review the edit, change any item, then add the set to your bag or send the brief to OzaBay for a curated gifting request.</p></div>
        </div>
      </div>
    </div>
  </section>
}

function CraftFilm(){
  const sectionRef=useRef(null);
  const [stage,setStage]=useState(0);
  const [videoFailed,setVideoFailed]=useState({a:false,b:false});
  const stages=[
    {eyebrow:"01 · MATERIAL",title:"It begins with earth.",copy:"Raw clay meets the hands that know exactly how it should move.",image:IMG.terracotta,video:"a"},
    {eyebrow:"02 · HANDS",title:"Made by hand.",copy:"Pressure, rhythm and patience shape every curve of the piece.",image:IMG.sculptural,video:"a"},
    {eyebrow:"03 · DETAIL",title:"Finished slowly.",copy:"Every turn of the wheel leaves behind a detail no machine can repeat.",image:IMG.blue,video:"b"},
    {eyebrow:"04 · OBJECT",title:"From hands to home.",copy:"A workshop gesture becomes an object made to live with you.",image:IMG.indigo,video:"b"},
  ];
  useEffect(()=>{
    const el=sectionRef.current;if(!el)return;
    const update=()=>{
      const r=el.getBoundingClientRect();
      const total=Math.max(1,r.height-window.innerHeight);
      const progress=Math.min(1,Math.max(0,-r.top/total));
      setStage(Math.min(stages.length-1,Math.floor(progress*stages.length)));
    };
    update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
    return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update)};
  },[]);
  const jumpStage=(index)=>{
    setStage(index);
    const el=sectionRef.current;if(!el)return;
    const maxScroll=Math.max(0,el.offsetHeight-window.innerHeight);
    const target=el.getBoundingClientRect().top+window.scrollY+(maxScroll*(index/(stages.length-1)));
    window.scrollTo({top:target,behavior:"smooth"});
  };
  const active=stages[stage];
  const srcA=videoFailed.a?VIDEOS.craft:VIDEOS.artisanA;
  const srcB=videoFailed.b?VIDEOS.detail:VIDEOS.artisanB;
  return <section ref={sectionRef} className="oz-section craft-film craft-film--story">
    <div className="craft-story-pin">
      <div className="craft-story-frame">
        <video className={`craft-story-video craft-story-video--a ${active.video==="a"?"is-active":""}`} src={srcA} autoPlay muted loop playsInline preload="metadata" poster={IMG.terracotta} onError={()=>setVideoFailed(v=>({...v,a:true}))} aria-label="Artisan shaping clay by hand on a pottery wheel"/>
        <video className={`craft-story-video craft-story-video--b ${active.video==="b"?"is-active":""}`} src={srcB} autoPlay muted loop playsInline preload="metadata" poster={IMG.sculptural} onError={()=>setVideoFailed(v=>({...v,b:true}))} aria-label="Close-up of an artisan molding clay on a pottery wheel"/>
        <div className="craft-story-wash"/>
        <div className="craft-story-filmgrain" aria-hidden="true"/>
        <div className="craft-story-product"><img src={active.image} alt=""/><span>HANDMADE / INDIA</span></div>
        <div className="craft-story-copy" key={stage}>
          <p className="eyebrow">{active.eyebrow}</p><h2>{active.title}</h2><p>{active.copy}</p>
          <button className="hero-action" onClick={()=>document.getElementById("artisans")?.scrollIntoView({behavior:"smooth"})}>Meet the makers ↗</button>
        </div>
        <div className="craft-story-steps" aria-label="Craft story progress">{stages.map((s,i)=><button key={s.eyebrow} className={i===stage?"is-active":""} onClick={()=>jumpStage(i)} aria-label={`Go to ${s.eyebrow}`}><span/></button>)}</div>
        <div className="craft-story-caption"><span>OZABAY / CRAFT FILM · REAL MAKER FOOTAGE</span><strong>FROM HANDS <i>→</i> HOME</strong></div>
        <div className="craft-story-live"><i/> LIVE CRAFT FILM</div>
      </div>
    </div>
  </section>
}

function Product3DViewer({product,onClose,onAdd,onSpace}){
  const [rotation,setRotation]=useState(-18);
  const [pitch,setPitch]=useState(3);
  const [zoom,setZoom]=useState(1);
  const [autoSpin,setAutoSpin]=useState(true);
  const [light,setLight]=useState({x:50,y:42});
  const dragging=useRef(false);
  const last=useRef({x:0,y:0});
  const reset=()=>{setRotation(-18);setPitch(3);setZoom(1);setAutoSpin(true);setLight({x:50,y:42});};
  useEffect(()=>{if(!autoSpin)return;const id=setInterval(()=>setRotation(v=>(v+.42)%360),32);return()=>clearInterval(id)},[autoSpin]);
  const down=e=>{if(e.button!==undefined&&e.button!==0)return;dragging.current=true;last.current={x:e.clientX,y:e.clientY};setAutoSpin(false);e.currentTarget.setPointerCapture?.(e.pointerId)};
  const move=e=>{const r=e.currentTarget.getBoundingClientRect();setLight({x:Math.max(8,Math.min(92,((e.clientX-r.left)/r.width)*100)),y:Math.max(8,Math.min(88,((e.clientY-r.top)/r.height)*100))});if(!dragging.current)return;const dx=e.clientX-last.current.x;const dy=e.clientY-last.current.y;last.current={x:e.clientX,y:e.clientY};setRotation(v=>v+dx*.62);setPitch(v=>Math.max(-16,Math.min(18,v-dy*.34)))};
  const stop=()=>{dragging.current=false};
  const zoomIn=()=>setZoom(v=>Math.min(1.55,Number((v+.1).toFixed(2))));
  const zoomOut=()=>setZoom(v=>Math.max(.72,Number((v-.1).toFixed(2))));
  return <div className="viewer-shell">
    <button className="modal-close" onClick={onClose} aria-label="Close 3D viewer">×</button>
    <div className="viewer-copy">
      <p className="eyebrow">Interactive product studio</p>
      <h2>See it from <em>every angle.</em></h2>
      <p>Explore the piece like you are holding it in your hands. Drag in any direction, zoom into the silhouette and switch to the room preview when you are ready.</p>
      <div className="viewer-status"><span className={autoSpin?"is-live":""}><i/> {autoSpin?"Auto orbiting":"Manual inspection"}</span><span>Drag · Pinch / scroll · Arrow keys</span></div>
      <div className="viewer-actions"><button className="hero-action" onClick={()=>setAutoSpin(v=>!v)}>{autoSpin?"Pause rotation":"Auto rotate"} ↻</button><button className="text-link" onClick={()=>onSpace(product)}>View in your space ↗</button><button className="text-link" onClick={()=>onAdd(product)}>Add to bag ↗</button></div>
    </div>
    <div className="viewer-stage" style={{"--viewer-light-x":`${light.x}%`,"--viewer-light-y":`${light.y}%`}} onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onDoubleClick={reset} onWheel={e=>e.deltaY<0?zoomIn():zoomOut()} tabIndex="0" onKeyDown={e=>{if(e.key==="ArrowLeft")setRotation(v=>v-10);if(e.key==="ArrowRight")setRotation(v=>v+10);if(e.key==="ArrowUp")setPitch(v=>Math.max(-16,v-7));if(e.key==="ArrowDown")setPitch(v=>Math.min(18,v+7));if(e.key==="+")zoomIn();if(e.key==="-")zoomOut();if(e.key==="0")reset();}} aria-label={`Interactive 3D presentation of ${product.name}`}>
      <div className="viewer-halo"/><div className="viewer-floor"/><div className="viewer-grid"/>
      <div className="viewer-object" style={{transform:`translateZ(0) scale(${zoom}) rotateX(${pitch}deg) rotateY(${rotation}deg)`}}>
        <span className="viewer-layer viewer-layer--back"><img src={product.image} alt="" draggable="false"/></span>
        <span className="viewer-layer viewer-layer--mid"><img src={product.image} alt="" draggable="false"/></span>
        <span className="viewer-layer viewer-layer--front"><img src={product.image} alt={product.name} draggable="false"/></span>
        <span className="viewer-specular"/>
      </div>
      <div className="viewer-controls" onPointerDown={e=>e.stopPropagation()}><button onClick={zoomIn} aria-label="Zoom in">+</button><button onClick={reset} aria-label="Reset 3D view">Reset</button><button onClick={zoomOut} aria-label="Zoom out">−</button></div>
      <span className="viewer-hint">Drag to orbit · Double click to reset</span>
    </div>
    <div className="viewer-meta"><strong>{product.name}</strong><span>{product.category} · {money(product.priceValue)} · {product.city}</span></div>
  </div>
}

function ProductDetail({product,onClose,onAdd,onView3D,onSpace,onReview}){
  const [tab,setTab]=useState("story");
  return <div><button className="modal-close" onClick={onClose}>×</button><div className="pdp-grid"><div className="pdp-media"><div className="pdp-main-image"><img src={product.image} alt={product.name}/><span className="media-badge">Handmade · {product.rating} ★</span></div><div className="pdp-media-row"><img src={product.image} alt="Product detail"/><video src={VIDEOS.detail} autoPlay muted loop playsInline poster={product.image}/></div><div className="pdp-media-actions"><button onClick={()=>onView3D(product)}>3D view ↗</button><button onClick={()=>onSpace(product)}>View in your space ↗</button></div></div><div className="pdp-copy"><p className="eyebrow">{product.category} · {product.city}</p><h2>{product.name}</h2><div className="pdp-price-row"><strong>{product.price}</strong><span>★ {product.rating}</span></div><p>{product.description}</p><div className="pdp-maker"><span>Made by</span><strong>{product.artisan}</strong><small>{product.story}</small></div><div className="pdp-tabs"><button className={tab==="story"?"is-active":""} onClick={()=>setTab("story")}>Story</button><button className={tab==="details"?"is-active":""} onClick={()=>setTab("details")}>Details</button><button className={tab==="reviews"?"is-active":""} onClick={()=>setTab("reviews")}>Reviews</button></div>{tab==="story"&&<div className="tab-panel"><p>{product.story}</p><div className="craft-note"><span>Craft passport</span><strong>Handmade in {product.city}</strong><small>Small-batch edition · maker verified · natural variation expected</small></div></div>}{tab==="details"&&<div className="tab-panel product-facts"><span>Material <b>{product.material}</b></span><span>Dimensions <b>{product.dimensions}</b></span><span>Care <b>{product.care}</b></span><span>Maker <b>{product.artisan}</b></span></div>}{tab==="reviews"&&<div className="tab-panel review-list">{REVIEWS.map(([n,t,r])=><div key={n}><strong>{n} <span>{"★".repeat(r)}</span></strong><p>{t}</p></div>)}<button className="text-link" onClick={()=>onReview(product)}>Write a review ↗</button></div>}<button className="hero-action" onClick={()=>onAdd(product)}>Add to bag · {product.price} ↗</button></div></div></div>
}

export default function App(){
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-cart")||"[]")}catch{return []}});
  const [wish,setWish]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-wishlist")||"[]")}catch{return []}});
  const [filter,setFilter]=useState("All");const [sort,setSort]=useState("featured");const [query,setQuery]=useState("");const [modal,setModal]=useState(null);const [page,setPage]=useState(1);
  const [custom,setCustom]=useState({form:"Vessel",material:"Clay",finish:"Natural",size:"Medium",tone:"Earth",engraving:"",notes:""});
  const [orderForm,setOrderForm]=useState({name:"",email:"",phone:"",city:"",address:"",quantity:"1",budget:"",neededBy:"",purpose:"",referenceName:"",approval:"Yes"});const [orderSent,setOrderSent]=useState(false);const [requestId,setRequestId]=useState("");const [customStep,setCustomStep]=useState(1);
  const [account,setAccount]=useState(()=>{try{return JSON.parse(localStorage.getItem("ozabay-account")||"null")}catch{return null}});
  const [checkout,setCheckout]=useState({name:"",phone:"",email:"",address:"",city:"",pincode:"",payment:"Cash on delivery"});const [placedOrder,setPlacedOrder]=useState(null);
  const [tracking,setTracking]=useState("");const [reviewProduct,setReviewProduct]=useState(null);
  const [scrollProgress,setScrollProgress]=useState(0);
  const [gift,setGift]=useState({occasion:"Housewarming",recipient:"Parents",budget:"₹5,000",style:"Earthy",wrapping:true,message:"Wishing you a beautiful new beginning."});
  const perPage=12;
  const categories=["All",...COLLECTIONS.map(c=>c.filter)];
  const shown=useMemo(()=>{let list=PRODUCTS.filter(p=>(filter==="All"||p.category===filter)&&`${p.name} ${p.category} ${p.artisan} ${p.city} ${p.material}`.toLowerCase().includes(query.toLowerCase()));if(sort==="price-low")list.sort((a,b)=>a.priceValue-b.priceValue);if(sort==="price-high")list.sort((a,b)=>b.priceValue-a.priceValue);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));return list},[filter,query,sort]);
  const visible=shown.slice(0,page*perPage);const totalPages=Math.max(1,Math.ceil(shown.length/perPage));const cartCount=cart.reduce((n,p)=>n+p.qty,0);const cartTotal=cart.reduce((n,p)=>n+p.priceValue*p.qty,0);
  const customPrice=CUSTOM_PRICES.form[custom.form]+CUSTOM_PRICES.material[custom.material]+CUSTOM_PRICES.finish[custom.finish]+CUSTOM_PRICES.size[custom.size]+CUSTOM_PRICES.tone[custom.tone]+(custom.engraving.trim()?450:0);
  const customImage=custom.material==="Brass"?IMG.blue:(custom.finish==="Indigo"||custom.tone==="Indigo"?IMG.indigo:IMG.sculptural);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  useEffect(()=>{setPage(1)},[filter,query,sort]);useEffect(()=>{localStorage.setItem("ozabay-cart",JSON.stringify(cart))},[cart]);useEffect(()=>{localStorage.setItem("ozabay-wishlist",JSON.stringify(wish))},[wish]);
  useEffect(()=>{const update=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setScrollProgress(max>0?(window.scrollY/max)*100:0)};update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update)}},[]);
  const add=p=>setCart(c=>c.some(x=>x.id===p.id)?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]);
  const remove=id=>setCart(c=>c.filter(x=>x.id!==id));const qty=(id,d)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+d)}:x));const toggleWish=p=>setWish(w=>w.includes(p.id)?w.filter(id=>id!==p.id):[...w,p.id]);
  const addCustom=()=>{const p={id:`custom-${Date.now()}`,name:`Custom ${custom.form}`,category:"Made to order",priceValue:customPrice,price:money(customPrice),image:customImage,artisan:"OzaBay Custom Studio",city:"India",material:custom.material,custom:{...custom}};setCart(c=>[...c,{...p,qty:1}]);setModal("cart")};
  const submitCustom=e=>{e.preventDefault();const id=`OZ-C${Date.now().toString().slice(-7)}`;const payload={requestId:id,createdAt:new Date().toISOString(),customer:orderForm,design:custom,price:customPrice};localStorage.setItem("ozabay-last-custom-request",JSON.stringify(payload));setRequestId(id);setOrderSent(true);setCustomStep(1)};
  const placeOrder=e=>{e.preventDefault();if(!cart.length)return;const id=`OZ-${Date.now().toString().slice(-7)}`;const order={id,createdAt:new Date().toISOString(),items:cart,total:cartTotal,customer:checkout,status:"Crafting"};localStorage.setItem("ozabay-last-order",JSON.stringify(order));setPlacedOrder(order);setCart([]);setModal("order-success")};
  const signIn=e=>{e.preventDefault();const data={name:e.target.name.value,email:e.target.email.value};localStorage.setItem("ozabay-account",JSON.stringify(data));setAccount(data);setModal("account")};
  const openNav=id=>{const map={shop:"products",collections:"collections",artisans:"artisans","create-your-own":"create",journal:"journal",about:"story"};if(["corporate","sell","support"].includes(id)){setModal(id);return}go(map[id]||"home")};
  const resetCustom=()=>setCustom({form:"Vessel",material:"Clay",finish:"Natural",size:"Medium",tone:"Earth",engraving:"",notes:""});
  const customOptions={form:Object.keys(CUSTOM_PRICES.form),material:Object.keys(CUSTOM_PRICES.material),finish:Object.keys(CUSTOM_PRICES.finish),size:Object.keys(CUSTOM_PRICES.size),tone:Object.keys(CUSTOM_PRICES.tone)};

  return <>
    <div className="scroll-progress" style={{transform:`scaleX(${scrollProgress/100})`}} aria-hidden="true"/>
    <div className="page-vignette" aria-hidden="true"/>
    <Navbar activeId="shop" cartCount={cartCount} onSearchClick={()=>setModal("search")} onAccountClick={()=>setModal("account")} onCartClick={()=>setModal("cart")} onNavClick={openNav}/>
    <main id="home">
      <Hero onExploreClick={()=>go("collections")} onCreateClick={()=>go("create")}/>

      <Reveal className="oz-section oz-intro" id="story"><div className="oz-container oz-intro__grid"><p className="eyebrow">The digital atelier</p><div><h2>Objects that carry the <em>human touch.</em></h2><p>OzaBay brings together small-batch objects made by independent Indian artisans. Every curve, weave and tool mark is part of the story.</p><button className="text-link" onClick={()=>setModal("about")}>Discover the OzaBay story ↗</button></div></div></Reveal>

      <CraftFilm/>

      <section id="collections" className="oz-section oz-collections"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">Curated by craft</p><h2>Find your <em>collection.</em></h2></div><p>Seven craft worlds, each with a considered edit of handmade pieces.</p></div></Reveal><div className="collection-grid">{COLLECTIONS.map((c,i)=><Reveal key={c.id} className={`collection-card collection-card--${i+1}`}><button onClick={()=>{setFilter(c.filter);go("products")}}><div className="collection-card__image"><img src={c.image} alt={c.name}/><span>{String(PRODUCTS.filter(p=>p.category===c.filter).length).padStart(2,"0")} pieces</span></div><div className="collection-card__copy"><div><h3>{c.name}</h3><p>{c.copy}</p></div><strong>Explore ↗</strong></div></button></Reveal>)}</div></div></section>

      <section id="products" className="oz-section oz-products"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">The marketplace</p><h2>Made for <em>slow living.</em></h2></div><p>{PRODUCTS.length} pieces across seven collections. Every listing opens into a richer product story, 3D studio, craft passport and bag flow.</p></div></Reveal><div className="catalog-toolbar"><div className="filter-row">{categories.map(c=><button key={c} className={filter===c?"is-active":""} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="catalog-tools"><span>{shown.length} pieces</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></div></div>{visible.length?<div className="product-grid">{visible.map((p,i)=><Reveal key={p.id}><TiltCard className="product-card"><div className="product-image" onClick={()=>setModal({type:"product",product:p})} role="button" tabIndex="0" onKeyDown={e=>{if(e.key==="Enter"||e.key===" ")setModal({type:"product",product:p})}}><img src={p.image} alt={p.name}/><span className="product-badge">{i<3&&page===1?"OzaBay Edit":p.category}</span><button className={`wishlist-btn ${wish.includes(p.id)?"is-liked":""}`} onClick={e=>{e.stopPropagation();toggleWish(p)}} aria-label="Toggle wishlist">♡</button><div className="product-card__tools" onClick={e=>e.stopPropagation()}><button onClick={()=>setModal({type:"product",product:p})}>Quick view</button><button onClick={()=>setModal({type:"3d",product:p})}>3D view</button></div><span className="product-image__hint">Tap to explore</span></div><div className="product-card__meta"><div><span>{p.artisan} · {p.city}</span><h3>{p.name}</h3><p>{p.material} · ★ {p.rating}</p></div><strong>{p.price}</strong></div><button className="product-add" onClick={()=>{add(p);setModal("cart")}}>Add to bag <span>↗</span></button></TiltCard></Reveal>)}</div>:<div className="empty-state"><h3>No pieces found.</h3><p>Try another search or collection.</p><button className="hero-action" onClick={()=>{setFilter("All");setQuery("")}}>Reset edit ↗</button></div>}{visible.length<shown.length&&<div className="load-more"><span>Showing {visible.length} of {shown.length}</span><button className="hero-action" onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Load more pieces ↗</button></div>}</div></section>

      <section className="oz-section bundle-section"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">Complete the space</p><h2>Curated <em>rituals.</em></h2></div><p>Build a room around one handmade anchor instead of shopping one object at a time.</p></div></Reveal><div className="bundle-grid">{[["The Indigo Table","A bowl, runner and blue pottery accent.",[3,19,8],IMG.indigo],["The Earthy Entry","A vessel, carved tray and small planter.",[1,24,11],IMG.terracotta],["The Quiet Desk","A keepsake box, lamp and hand-finished bowl.",[27,29,4],IMG.sculptural]].map(([title,desc,ids,image])=><article className="bundle-card" key={title}><img src={image} alt=""/><div><p className="eyebrow">Curated set</p><h3>{title}</h3><p>{desc}</p><strong>{money(ids.reduce((s,id)=>s+PRODUCTS.find(p=>p.id===id).priceValue,0))}</strong><button className="text-link" onClick={()=>ids.forEach(id=>add(PRODUCTS.find(p=>p.id===id)))}>Add the set ↗</button></div></article>)}</div></div></section>

      <section id="artisans" className="oz-section artisans-section"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">Made by people</p><h2>Meet the <em>makers.</em></h2></div><p>Each maker has a place in the marketplace—not just a name beneath a product.</p></div></Reveal><div className="artisan-grid">{ARTISANS.map(a=><article className="artisan-card" key={a.id}><button onClick={()=>setModal({type:"artisan",artisan:a})}><div className="artisan-card__image"><img src={a.image} alt={a.name}/><span>INDIA · {a.city.split(",")[0]}</span></div><div className="artisan-card__copy"><p>{a.craft}</p><h3>{a.name}</h3><span>{a.story}</span><strong>Open maker profile ↗</strong></div></button></article>)}</div></div></section>

      <section className="oz-section passport-section"><div className="oz-container passport-grid"><div><p className="eyebrow">Craft passport</p><h2>Know who made <em>what you keep.</em></h2><p>Every product can carry a digital passport with maker, place, material, care and edition information. The UI is ready now; a production verification service can be connected later.</p><button className="hero-action" onClick={()=>setModal({type:"passport",product:PRODUCTS[1]})}>Preview a passport ↗</button></div><div className="passport-card"><div className="passport-card__top"><span>OZABAY / CRAFT PASSPORT</span><span>01 — 07</span></div><div className="passport-card__seal">OB</div><p>JAIPUR · BLUE POTTERY</p><h3>Hand-painted by<br/><em>Aarav Khan</em></h3><div className="passport-lines"><span>Edition <b>Small batch</b></span><span>Material <b>Ceramic clay</b></span><span>Finish <b>Hand painted</b></span></div><button onClick={()=>setModal({type:"passport",product:PRODUCTS[1]})}>Open record ↗</button></div></div></section>

      <section id="reviews" className="oz-section reviews-section">
  <div className="oz-container">
    <Reveal><div className="section-head reviews-head"><div><p className="eyebrow">The OzaBay journal of feedback</p><h2>Loved for the <em>little details.</em></h2></div><p>Explore the review experience we are building for OzaBay. Product ratings, written notes and customer imagery can all live here once the review backend is connected.</p></div></Reveal>
    <div className="reviews-summary">
      <div className="reviews-score"><strong>4.9</strong><span>★★★★★</span><small>Demo review experience</small></div>
      <div className="reviews-bars">{[[5,82],[4,13],[3,4],[2,1],[1,0]].map(([n,w])=><div key={n}><span>{n} ★</span><i><b style={{width:`${w}%`}}/></i><em>{w}%</em></div>)}</div>
      <div className="reviews-trust"><span>HANDMADE</span><strong>Craft-first</strong><small>Maker story · material · care · customer notes</small></div>
    </div>
   <div className="reviews-grid">{[
        ["Aarohi S.","Jaipur Blue Pottery Vase","The piece has such a quiet presence. I loved seeing the maker story before deciding where it would sit at home.","https://images.pexels.com/photos/4307872/pexels-photo-4307872.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Kabir M.","Neel Indigo Bowl Set","The product view makes the silhouette and scale much easier to understand. The indigo finish is beautiful.","https://images.pexels.com/photos/4308159/pexels-photo-4308159.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Naina P.","Mitti Sculptural Vase","The tiny variations are exactly what make handmade objects feel special. The passport concept is a lovely touch.","https://images.pexels.com/photos/7627130/pexels-photo-7627130.jpeg?auto=compress&cs=tinysrgb&w=1000",4],

        ["Riya K.","Ganga Handloom Runner","The texture-first presentation feels much more useful than a generic product grid. It feels considered.","https://images.pexels.com/photos/17611927/pexels-photo-17611927.jpeg?auto=compress&cs=tinysrgb&w=1000",5],

        ["Arjun R.","Neem Carved Serving Board","I wanted something functional but not mass-produced. The craft story helps explain what makes the piece different.","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrOWIfL8p2wnh6Js43L2qyHxkZGWCHsLX5odyxYzKadg&s=10",5],

        ["Maya D.","Aangan Stoneware Lamp","The combination of artisan details, material information and the 3D concept makes browsing much easier.","https://images.pexels.com/photos/36562466/pexels-photo-36562466.jpeg?auto=compress&cs=tinysrgb&w=1000",4],
       ].map(([name,product,text,image,rating],i)=><article className="review-card" key={name}>
      <div className="review-card__image"><img src={image} alt=""/><span>REVIEW PREVIEW</span></div>
      <div className="review-card__body"><div className="review-card__top"><span>{"★".repeat(rating)}</span><small>Demo note</small></div><p>“{text}”</p><div className="review-card__person"><strong>{name}</strong><span>{product}</span></div></div>
    </article>)}</div>
  </div>
</section>

<section id="create" className="oz-section oz-create"><div className="oz-container"><Reveal><div className="section-head custom-studio-head"><div><p className="eyebrow">OzaBay Custom Studio</p><h2>Create something <em>that is yours.</em></h2></div><div><p>Build your piece one choice at a time. The preview, estimated price and final design brief update as you customize.</p><div className="custom-studio-flow"><span><b>01</b> Choose</span><i>→</i><span><b>02</b> Customize</span><i>→</i><span><b>03</b> Review</span><i>→</i><span><b>04</b> Request</span></div></div></div></Reveal><div className="create-grid"><div className="create-preview"><CustomLivePreview custom={custom} price={customPrice} image={customImage}/></div><div className="builder"><div className="builder-intro"><span>01 · BUILD YOUR PIECE</span><strong>Every choice changes the preview.</strong><small>Start with the form, then refine material, finish, size and tone.</small></div><BuilderGroup label="Form" value={custom.form} options={customOptions.form} onChange={v=>setCustom(c=>({...c,form:v}))}/><BuilderGroup label="Material" value={custom.material} options={customOptions.material} onChange={v=>setCustom(c=>({...c,material:v}))}/><BuilderGroup label="Finish" value={custom.finish} options={customOptions.finish} onChange={v=>setCustom(c=>({...c,finish:v}))}/><BuilderGroup label="Size" value={custom.size} options={customOptions.size} onChange={v=>setCustom(c=>({...c,size:v}))}/><BuilderGroup label="Tone" value={custom.tone} options={customOptions.tone} onChange={v=>setCustom(c=>({...c,tone:v}))}/><label className="builder-field">Engraving<input value={custom.engraving} onChange={e=>setCustom(c=>({...c,engraving:e.target.value}))} placeholder="Optional name / date"/></label><label className="builder-field">Maker notes<textarea value={custom.notes} onChange={e=>setCustom(c=>({...c,notes:e.target.value}))} placeholder="Tell the maker what matters to you…"/></label><div className="builder-actions"><button className="hero-action" onClick={addCustom}>Add custom piece · {money(customPrice)} ↗</button><button className="text-link" onClick={()=>{setOrderSent(false);setCustomStep(1);setModal("custom-order")}}>Request made-to-order ↗</button><button className="text-link" onClick={resetCustom}>Reset</button></div></div></div></div></section>

      <GiftBuilder gift={gift} setGift={setGift} onCreate={(items,total)=>setModal({type:"gift-result",items,total})}/>

      <section className="oz-section order-track-section"><div className="oz-container track-grid"><div><p className="eyebrow">After checkout</p><h2>Track the <em>craft journey.</em></h2><p>Enter any demo OzaBay order ID generated by this frontend to see the UI for order status, maker stage and delivery handoff.</p><form onSubmit={e=>{e.preventDefault();setModal("tracking");}} className="track-form"><input value={tracking} onChange={e=>setTracking(e.target.value)} placeholder="e.g. OZ-1234567"/><button className="hero-action">Track order ↗</button></form></div><div className="timeline"><div className="timeline-step is-done"><span>01</span><div><strong>Order received</strong><small>Payment / request captured</small></div></div><div className="timeline-step is-current"><span>02</span><div><strong>Maker crafting</strong><small>Handmade work in progress</small></div></div><div className="timeline-step"><span>03</span><div><strong>Quality checked</strong><small>Final inspection & passport</small></div></div><div className="timeline-step"><span>04</span><div><strong>On the way</strong><small>Courier handoff</small></div></div></div></div></section>

      <section className="oz-section sell-section"><div className="oz-container sell-grid"><div><p className="eyebrow">For independent makers</p><h2>Bring your craft <em>to OzaBay.</em></h2><p>Seller onboarding, maker profiles, product drafts and order stages are designed as a frontend-first marketplace workflow.</p><button className="hero-action" onClick={()=>setModal("sell")}>Open seller studio ↗</button></div><div className="seller-card"><div><span>MAKER STUDIO</span><strong>06</strong></div><p>Profile completeness</p><div className="progress"><i/></div><ul><li>Maker profile</li><li>Product catalogue</li><li>Custom order inbox</li><li>Craft passport</li><li>Order fulfilment</li></ul></div></div></section>

      <section id="journal" className="oz-section journal-section"><div className="oz-container"><Reveal><div className="section-head"><div><p className="eyebrow">The journal</p><h2>Notes on <em>making.</em></h2></div><button className="text-link" onClick={()=>setModal("journal")}>Open all stories ↗</button></div></Reveal><div className="journal-grid"><article><img src={IMG.terracotta} alt="Terracotta"/><span>CRAFT / 06 MIN</span><h3>Why handmade variation is part of the design.</h3><button onClick={()=>setModal("journal")}>Read story ↗</button></article><article><img src={IMG.blue} alt="Blue pottery"/><span>PLACE / 04 MIN</span><h3>Inside the colour language of Jaipur blue pottery.</h3><button onClick={()=>setModal("journal")}>Read story ↗</button></article><article><img src={IMG.indigo} alt="Indigo bowls"/><span>HOME / 05 MIN</span><h3>How to build a slower room around one object.</h3><button onClick={()=>setModal("journal")}>Read story ↗</button></article></div></div></section>

      <section className="oz-section newsletter"><div className="oz-container newsletter-box"><div><p className="eyebrow">The OzaBay letter</p><h2>New makers, new drops,<br/><em>quietly delivered.</em></h2></div><form onSubmit={e=>{e.preventDefault();setModal("thanks")}}><input type="email" required placeholder="Your email address"/><button>Subscribe ↗</button></form></div></section>
    </main>

    <footer className="oz-footer"><div className="oz-container footer-grid"><div><span>OzaBay</span><p>Indian craft, contemporary living.<br/>Frontend marketplace experience.</p></div><div><span>Explore</span><button onClick={()=>go("products")}>Shop</button><button onClick={()=>go("collections")}>Collections</button><button onClick={()=>go("artisans")}>Artisans</button><button onClick={()=>go("create")}>Create Your Own</button></div><div><span>OzaBay</span><button onClick={()=>setModal("about")}>About</button><button onClick={()=>setModal("corporate")}>Corporate</button><button onClick={()=>setModal("sell")}>Sell on OzaBay</button><button onClick={()=>setModal("support")}>Support</button></div><div><span>Your space</span><button onClick={()=>setModal("account")}>Account</button><button onClick={()=>setModal("wishlist")}>Wishlist ({wish.length})</button><button onClick={()=>setModal("cart")}>Bag ({cartCount})</button><button onClick={()=>setModal("tracking")}>Track order</button></div></div></footer>

    {modal&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><div className={`modal ${modal?.type==="3d"?"modal--3d":""}`}>
      {modal?.type==="3d"&&<Product3DViewer product={modal.product} onClose={()=>setModal(null)} onAdd={p=>{add(p);setModal("cart")}} onSpace={p=>setModal({type:"space",product:p})}/>} 
      {modal?.type==="product"&&<ProductDetail product={modal.product} onClose={()=>setModal(null)} onAdd={p=>{add(p);setModal("cart")}} onView3D={p=>setModal({type:"3d",product:p})} onSpace={p=>setModal({type:"space",product:p})} onReview={p=>setReviewProduct(p)}/>} 
      {modal?.type==="space"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">View in your space</p><h2>Preview <em>{modal.product.name}</em> at home.</h2><div className="space-room"><div className="space-floor"/><div className="space-wall"><span>OzaBay room preview</span><div className="space-object"><img src={modal.product.image} alt=""/></div></div></div><p className="space-note">This is a frontend room-scale preview concept. A production AR layer can replace it later without changing the product flow.</p><button className="hero-action" onClick={()=>{add(modal.product);setModal("cart")}}>Add to bag ↗</button></>}
      {modal?.type==="artisan"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="artisan-modal"><img src={modal.artisan.image} alt={modal.artisan.name}/><div><p className="eyebrow">{modal.artisan.craft}</p><h2>{modal.artisan.name}<br/><em>by hand.</em></h2><p>{modal.artisan.story}</p><div className="artisan-facts"><span>Studio <b>{modal.artisan.city}</b></span><span>Craft <b>{modal.artisan.products}</b></span><span>Marketplace status <b>Verified maker UI</b></span></div><button className="hero-action" onClick={()=>{setFilter(modal.artisan.products);setQuery("");setModal(null);go("products")}}>Shop this maker ↗</button></div></div></>}
      {modal?.type==="passport"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Digital craft passport</p><h2>One object.<br/><em>One traceable story.</em></h2><div className="passport-detail"><img src={modal.product.image} alt=""/><div><span>PRODUCT</span><strong>{modal.product.name}</strong><span>MAKER</span><strong>{modal.product.artisan}</strong><span>PLACE</span><strong>{modal.product.city}</strong><span>MATERIAL</span><strong>{modal.product.material}</strong><span>CARE</span><strong>{modal.product.care}</strong></div></div></>}
      {modal?.type==="gift-result"&&<>
        <button className="modal-close" onClick={()=>setModal(null)}>×</button>
        <div className="gift-result-modal">
          <div><p className="eyebrow">Gift edit ready</p><h2>A thoughtful edit <em>for {gift.recipient.toLowerCase()}.</em></h2><p>We matched your occasion, style and budget with handmade pieces. Review the edit before you add it to your bag or send it to our gifting team.</p></div>
          <div className="gift-result-grid">{modal.items.map(p=><article key={p.id}><img src={p.image} alt={p.name}/><div><span>{p.category}</span><strong>{p.name}</strong><small>{p.price}</small></div></article>)}</div>
          <div className="gift-result-summary"><div><span>Occasion</span><strong>{gift.occasion}</strong></div><div><span>Recipient</span><strong>{gift.recipient}</strong></div><div><span>Style</span><strong>{gift.style}</strong></div><div><span>Wrapping</span><strong>{gift.wrapping?"Included":"Not added"}</strong></div><div className="gift-result-total"><span>Estimated edit</span><strong>{money(modal.total)}</strong></div></div>
          {gift.message&&<div className="gift-message-preview"><span>GIFT MESSAGE</span><p>“{gift.message}”</p></div>}
          <div className="gift-result-actions"><button className="hero-action" onClick={()=>{modal.items.forEach(p=>add(p));setModal("cart")}}>Add gift edit to bag ↗</button><button className="text-link" onClick={()=>setModal({type:"gift-request",items:modal.items,total:modal.total})}>Send gifting request ↗</button><button className="text-link" onClick={()=>setModal(null)}>Keep editing</button></div>
        </div>
      </>}
      {modal==="search"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Search OzaBay</p><h2>Find a <em>piece.</em></h2><input className="search-input" autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try blue pottery, brass, Meera, Jaipur…"/><div className="search-results">{PRODUCTS.filter(p=>`${p.name} ${p.category} ${p.artisan} ${p.city}`.toLowerCase().includes(query.toLowerCase())).slice(0,8).map(p=><button key={p.id} onClick={()=>setModal({type:"product",product:p})}><span>{p.name}</span><small>{p.category} · {p.price}</small></button>)}</div></>}
      {modal==="account"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button>{account?<><p className="eyebrow">Your OzaBay</p><h2>Welcome, <em>{account.name}.</em></h2><p>{account.email}</p><div className="account-actions"><button className="hero-action" onClick={()=>setModal("wishlist")}>Wishlist ({wish.length}) ↗</button><button className="text-link" onClick={()=>{localStorage.removeItem("ozabay-account");setAccount(null);setModal("account")}}>Sign out</button></div></>:<><p className="eyebrow">Your OzaBay</p><h2>Keep your <em>favourites.</em></h2><form className="order-form" onSubmit={signIn}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input name="email" type="email" required placeholder="you@example.com"/></label><button className="hero-action">Create demo account ↗</button></form></>}</>}
      {modal==="wishlist"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Saved pieces</p><h2>Your <em>wishlist.</em></h2>{wish.length?<div className="wishlist-list">{PRODUCTS.filter(p=>wish.includes(p.id)).map(p=><div key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{money(p.priceValue)}</span><button onClick={()=>{add(p);setModal("cart")}}>Add to bag</button></div></div>)}</div>:<p>Your wishlist is empty. Tap ♡ on any product to save it.</p>}</>}
      {modal==="cart"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Your bag</p><h2>{cartCount?`${cartCount} ${cartCount===1?"piece":"pieces"}.`:"Your bag is quiet."}</h2>{cart.length?<><div className="cart-list">{cart.map(p=><div key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{money(p.priceValue)} · {p.custom?"Custom":"Handmade"}</span><div className="qty-control"><button onClick={()=>qty(p.id,-1)}>−</button><b>{p.qty}</b><button onClick={()=>qty(p.id,1)}>+</button></div><button onClick={()=>remove(p.id)}>Remove</button></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><button className="hero-action" onClick={()=>setModal("checkout")}>Proceed to checkout ↗</button></>:<p>Start with something handmade from the edit.</p>}<button className="text-link" onClick={()=>{setModal(null);go("products")}}>Continue shopping ↗</button></>}
      {modal==="checkout"&&<><button className="modal-close" onClick={()=>setModal("cart")}>×</button><div className="checkout-grid"><div><p className="eyebrow">Checkout</p><h2>Make it <em>yours.</em></h2><p>Frontend checkout is ready for testing. Payment remains simulated until the backend/payment layer is connected.</p><div className="order-summary"><span>{cartCount} pieces</span><strong>{money(cartTotal)}</strong></div></div><form className="order-form" onSubmit={placeOrder}><label>Name<input required value={checkout.name} onChange={e=>setCheckout(v=>({...v,name:e.target.value}))}/></label><label>Phone<input required value={checkout.phone} onChange={e=>setCheckout(v=>({...v,phone:e.target.value}))}/></label><label>Email<input required type="email" value={checkout.email} onChange={e=>setCheckout(v=>({...v,email:e.target.value}))}/></label><label>Address<input required value={checkout.address} onChange={e=>setCheckout(v=>({...v,address:e.target.value}))}/></label><div className="form-two"><label>City<input required value={checkout.city} onChange={e=>setCheckout(v=>({...v,city:e.target.value}))}/></label><label>PIN<input required pattern="[0-9]{6}" value={checkout.pincode} onChange={e=>setCheckout(v=>({...v,pincode:e.target.value}))}/></label></div><label>Payment<select value={checkout.payment} onChange={e=>setCheckout(v=>({...v,payment:e.target.value}))}><option>Cash on delivery</option><option>UPI (demo)</option><option>Card (demo)</option></select></label><button className="hero-action">Place demo order · {money(cartTotal)} ↗</button></form></div></>}
      {placedOrder&&modal==="order-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Order confirmed</p><h2>Your order is <em>saved.</em></h2><p>Order ID: <strong>{placedOrder.id}</strong>. This browser stores the demo order so the tracking UI can be tested.</p><div className="custom-order-success"><span>Total</span><strong>{money(placedOrder.total)}</strong><span>Current stage</span><strong>Crafting with the maker</strong></div><button className="hero-action" onClick={()=>{setTracking(placedOrder.id);setModal("tracking")}}>Track this order ↗</button></>}
      {modal==="tracking"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Order tracking</p><h2>Craft journey <em>in motion.</em></h2><div className="track-code"><span>ORDER ID</span><strong>{tracking||placedOrder?.id||"OZ-DEMO"}</strong></div><div className="timeline timeline--modal"><div className="timeline-step is-done"><span>01</span><div><strong>Order received</strong><small>Request captured</small></div></div><div className="timeline-step is-current"><span>02</span><div><strong>Maker crafting</strong><small>Handmade work in progress</small></div></div><div className="timeline-step"><span>03</span><div><strong>Quality checked</strong><small>Craft passport attached</small></div></div><div className="timeline-step"><span>04</span><div><strong>Dispatched</strong><small>Courier handoff</small></div></div></div></>}
            {modal==="custom-order"&&!orderSent&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="custom-request-shell"><div className="custom-request-intro"><p className="eyebrow">Made-to-order studio</p><h2>Tell us how to make your <em>piece.</em></h2><p>First confirm the design you created. Then share the few details our maker needs to turn it into a real product. We’ll review the request before production.</p><div className="custom-request-steps"><span className={customStep===1?"is-active":"is-done"}>01 <b>Review design</b></span><span className={customStep===2?"is-active":""}>02 <b>Your details</b></span><span>03 <b>We make it</b></span></div><div className="custom-request-note"><strong>How it works</strong><span>1. You send the brief</span><span>2. OzaBay reviews it</span><span>3. We confirm price & timeline</span><span>4. Maker creates your piece</span></div></div>{customStep===1?<div className="custom-request-panel"><div className="custom-design-card"><div className="custom-design-card__image" style={{backgroundImage:`url(${customImage})`}}><span>YOUR DESIGN</span></div><div className="custom-design-card__body"><div><span>Form</span><strong>{custom.form}</strong></div><div><span>Material</span><strong>{custom.material}</strong></div><div><span>Finish</span><strong>{custom.finish}</strong></div><div><span>Size</span><strong>{custom.size}</strong></div><div><span>Tone</span><strong>{custom.tone}</strong></div>{custom.engraving&&<div><span>Engraving</span><strong>{custom.engraving}</strong></div>}</div></div><div className="custom-request-price"><span>Estimated starting price</span><strong>{money(customPrice)}</strong><small>Final price and production timeline are confirmed after our review.</small></div><button className="hero-action custom-request-next" onClick={()=>setCustomStep(2)}>Looks good — continue ↗</button><button className="text-link" onClick={()=>{setModal(null);setTimeout(()=>go("create"),50)}}>Edit my design ↗</button></div>:<form className="order-form custom-request-form" onSubmit={submitCustom}><div className="custom-form-heading"><span>STEP 02 · YOUR DETAILS</span><strong>Give the maker a clear brief.</strong><small>Required fields are marked with *</small></div><div className="form-two"><label>Full name *<input required autoComplete="name" value={orderForm.name} onChange={e=>setOrderForm(v=>({...v,name:e.target.value}))} placeholder="Your name"/></label><label>Email *<input required type="email" autoComplete="email" value={orderForm.email} onChange={e=>setOrderForm(v=>({...v,email:e.target.value}))} placeholder="you@example.com"/></label></div><div className="form-two"><label>Phone *<input required autoComplete="tel" value={orderForm.phone} onChange={e=>setOrderForm(v=>({...v,phone:e.target.value}))} placeholder="+91 98765 43210"/></label><label>Quantity *<input required type="number" min="1" max="50" value={orderForm.quantity} onChange={e=>setOrderForm(v=>({...v,quantity:e.target.value}))}/></label></div><div className="form-two"><label>City *<input required autoComplete="address-level2" value={orderForm.city} onChange={e=>setOrderForm(v=>({...v,city:e.target.value}))} placeholder="Jaipur"/></label><label>Budget range<input value={orderForm.budget} onChange={e=>setOrderForm(v=>({...v,budget:e.target.value}))} placeholder="e.g. ₹5,000–₹8,000"/></label></div><div className="form-two"><label>Needed by<input type="date" value={orderForm.neededBy} onChange={e=>setOrderForm(v=>({...v,neededBy:e.target.value}))}/></label><label>What is it for?<select value={orderForm.purpose} onChange={e=>setOrderForm(v=>({...v,purpose:e.target.value}))}><option value="">Choose one</option><option>Home décor</option><option>Gift</option><option>Wedding / event</option><option>Corporate gifting</option><option>Other</option></select></label></div><label>Delivery address *<textarea required value={orderForm.address} onChange={e=>setOrderForm(v=>({...v,address:e.target.value}))} placeholder="House / street, area, city, state, pincode"/></label><label>Anything the maker should know?<textarea value={custom.notes} onChange={e=>setCustom(c=>({...c,notes:e.target.value}))} placeholder="Colour preference, proportions, inspiration, special care…"/></label><div className="custom-request-upload"><div><span>REFERENCE IMAGE</span><strong>Optional — show us your inspiration</strong><small>For now this frontend stores the selected file name with the request.</small></div><label className="upload-btn">Choose image<input type="file" accept="image/*" onChange={e=>setOrderForm(v=>({...v,referenceName:e.target.files?.[0]?.name||""}))}/></label>{orderForm.referenceName&&<em>{orderForm.referenceName}</em>}</div><label className="approval-row"><input type="checkbox" required checked={orderForm.approval==="Yes"} onChange={e=>setOrderForm(v=>({...v,approval:e.target.checked?"Yes":""}))}/><span>I understand this is a made-to-order request. OzaBay will confirm the final design, price and timeline before production.</span></label><div className="custom-request-submit"><button type="button" className="text-link" onClick={()=>setCustomStep(1)}>← Back to design</button><button className="hero-action">Send my custom request ↗</button></div></form>}</div></>}
      {modal==="custom-order"&&orderSent&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Request received</p><h2>Your design is <em>saved.</em></h2><p>Request ID: <strong>{requestId}</strong>. This browser has stored the design reference.</p><div className="custom-order-success"><span>Design</span><strong>{custom.form} · {custom.material} · {custom.finish}</strong><span>Estimated price</span><strong>{money(customPrice)}</strong></div><button className="hero-action" onClick={()=>setModal(null)}>Back to studio ↗</button></>}
      {modal==="sell"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Maker studio</p><h2>Bring your craft <em>to OzaBay.</em></h2><form className="order-form seller-form" onSubmit={e=>{e.preventDefault();setModal("seller-success")}}><label>Maker / studio name<input required placeholder="Your studio"/></label><label>Craft category<select><option>Ceramics</option><option>Textiles</option><option>Metalcraft</option><option>Woodcraft</option><option>Terracotta</option></select></label><label>City<input required placeholder="Jaipur"/></label><label>Short craft story<textarea required placeholder="Tell customers what makes your work special…"/></label><button className="hero-action">Submit maker profile ↗</button></form></>}
      {modal==="seller-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Maker profile received</p><h2>Your studio is <em>ready for review.</em></h2><p>This is the frontend seller-onboarding state. The production workflow can connect verification, inventory and order management later.</p><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
      {modal?.type==="gift-request"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><div className="gift-request-shell"><div><p className="eyebrow">OzaBay gifting team</p><h2>Turn the edit into a <em>gift brief.</em></h2><p>Send us the selected pieces, recipient context and your message. The frontend stores the request locally until the gifting backend is connected.</p><div className="gift-request-summary"><span>{gift.occasion} · {gift.recipient}</span><strong>{gift.style} · {gift.budget}</strong><small>{gift.wrapping?"Gift wrapping requested · ":""}{gift.message?"Personalised message added":"No gift message"}</small></div></div><form className="order-form" onSubmit={e=>{e.preventDefault();const id=`OZ-G${Date.now().toString().slice(-7)}`;localStorage.setItem("ozabay-gift-request",JSON.stringify({requestId:id,createdAt:new Date().toISOString(),gift,items:modal?.items||[],total:modal?.total||0,customer:{name:e.target.name.value,email:e.target.email.value,phone:e.target.phone.value,city:e.target.city.value,neededBy:e.target.neededBy.value}}));setRequestId(id);setModal({type:"gift-success",total:modal.total})}}><label>Full name *<input name="name" required placeholder="Your name"/></label><label>Email *<input name="email" required type="email" placeholder="you@example.com"/></label><div className="form-two"><label>Phone *<input name="phone" required placeholder="+91 98765 43210"/></label><label>City *<input name="city" required placeholder="Jaipur"/></label></div><label>Needed by<input name="neededBy" type="date"/></label><label>Anything the gifting team should know?<textarea name="notes" placeholder="Recipient preferences, delivery timing, branding or special instructions…"/></label><button className="hero-action">Send gifting request ↗</button></form></div></>}
      {modal?.type==="gift-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Gifting request received</p><h2>Your gift brief is <em>with us.</em></h2><p>Request ID: <strong>{requestId}</strong>. We’ll review the edit and confirm the final availability, price and delivery timeline before fulfilment.</p><div className="custom-order-success"><span>Gift edit</span><strong>{gift.occasion} · {gift.style} · {gift.recipient}</strong><span>Estimated value</span><strong>{modal?.total?money(modal.total):gift.budget}</strong><span>Next step</span><strong>OzaBay gifting team review</strong></div><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
      {modal==="corporate"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Corporate & hospitality</p><h2>Thoughtful <em>gifting.</em></h2><form className="order-form" onSubmit={e=>{e.preventDefault();setModal("corporate-success")}}><label>Company<input required placeholder="Studio / company"/></label><label>Quantity<input required type="number" min="10" placeholder="50"/></label><label>Budget<input required placeholder="₹2,50,000"/></label><label>Brief<textarea required placeholder="Event, gifting theme, custom branding…"/></label><button className="hero-action">Request a curated quote ↗</button></form></>}
      {modal==="corporate-success"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Corporate brief saved</p><h2>We'll turn the brief into a <em>craft edit.</em></h2><p>The frontend is ready for quote requests, gifting sets and hospitality collections.</p><button className="hero-action" onClick={()=>setModal(null)}>Close ↗</button></>}
      {modal==="support"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Support</p><h2>How can we <em>help?</em></h2><div className="faq-list"><button>How does handmade variation work? <span>+</span></button><button>Can I request a custom piece? <span>+</span></button><button>Where can I track an order? <span>+</span></button><button>How do maker profiles work? <span>+</span></button></div></>}
      {modal==="about"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">About OzaBay</p><h2>Made by people.<br/><em>Kept by you.</em></h2><p>OzaBay is a digital atelier for Indian craft—bringing contemporary homes closer to the people who make the objects inside them. The current experience is frontend-first and intentionally ready for a future backend.</p><button className="hero-action" onClick={()=>setModal(null)}>Close ↗</button></>}
      {modal==="journal"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">OzaBay Journal</p><h2>Notes on <em>making.</em></h2><p>Stories about place, materials, maker routines and the small decisions behind handmade objects. This journal surface is ready for CMS content later.</p><div className="journal-modal-grid"><img src={IMG.terracotta} alt=""/><img src={IMG.blue} alt=""/><img src={IMG.indigo} alt=""/></div></>}
      {modal==="thanks"&&<><button className="modal-close" onClick={()=>setModal(null)}>×</button><p className="eyebrow">Thank you</p><h2>You're <em>in.</em></h2><p>Your newsletter signup is saved as a demo action in this browser.</p><button className="hero-action" onClick={()=>setModal(null)}>Back to OzaBay ↗</button></>}
    </div></div>}
    {reviewProduct&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setReviewProduct(null)}}><div className="modal review-modal"><button className="modal-close" onClick={()=>setReviewProduct(null)}>×</button><p className="eyebrow">Write a review</p><h2>Tell us about <em>{reviewProduct.name}.</em></h2><form className="order-form" onSubmit={e=>{e.preventDefault();const entry={productId:reviewProduct.id,createdAt:new Date().toISOString(),name:e.target.elements[0].value,rating:e.target.elements[1].value,note:e.target.elements[2].value};const saved=JSON.parse(localStorage.getItem("ozabay-reviews")||"[]");localStorage.setItem("ozabay-reviews",JSON.stringify([...saved,entry]));setReviewProduct(null);setModal({type:"product",product:reviewProduct})}}><label>Name<input required placeholder="Your name"/></label><label>Rating<select defaultValue="5"><option>5 — Excellent</option><option>4 — Great</option><option>3 — Good</option></select></label><label>Your note<textarea required placeholder="What did you love?"/></label><button className="hero-action">Save demo review ↗</button></form></div></div>}
  </>
}
