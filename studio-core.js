(function(root){
'use strict';
const BOTH=new Set(['p03','p05','p06','p07','p09','p10','p11','p13','p16','p17','p39','p41','p42','p44','p48','p50']);
const CATS=new Set(['p46']);
const colorMap={'Крем':'#f0e2c9','Цагаан':'#fff','Хар':'#303035','Бор':'#916849','Саарал':'#a1a2aa','Шар':'#f4d36d','Улаан':'#ce4b59','Ногоон':'#7ca36b','Номин':'#42b4ba','Нил ягаан':'#b49ace','Ягаан':'#edb5c9','Цайвар цэнхэр':'#b6d8e9','Олив ногоон':'#798065','Шаргал':'#d7b88c','Улбар шар':'#ebad5b'};
function group(p){if(['Хувцас','Гоёлын хувцас','Гутал'].includes(p.category))return 'wear';if(p.category==='Тоглоом')return 'play';return 'use'}
function species(p){return CATS.has(p.id)?['cat']:BOTH.has(p.id)?['dog','cat']:['dog']}
function products(data,pet,q='',category='all'){const query=q.trim().toLowerCase();return data.products.filter(p=>p.status==='review'&&p.slides.length&&species(p).includes(pet)&&(category==='all'||group(p)===category)&&(!query||(p.name+' '+p.category+' '+p.colors.join(' ')).toLowerCase().includes(query)))}
function reference(p,color,size){const exact=p.slides.find(s=>s.color===color&&(!s.size||s.size===size));const sized=p.slides.find(s=>s.size===size);const generic=p.slides.find(s=>!s.color);const slide=exact||sized||generic||p.slides[0];return {slide,exact:!!exact||p.colors.length<=1,unavailable:!exact&&p.colors.length>1&&!generic}}
function scene(p){const g=group(p);return g==='wear'?'wear':g==='play'?'play':'use'}
function swatch(color){if(colorMap[color])return colorMap[color];const parts=color.split(' / ').map(x=>colorMap[x]).filter(Boolean);if(parts.length===2)return `linear-gradient(135deg,${parts[0]} 50%,${parts[1]} 50%)`;return '#e9e1f3'}
function validatePhoto(f){if(!f)return 'Зургаа сонгоорой.';if(!['image/jpeg','image/png','image/webp'].includes(f.type))return 'JPG, PNG эсвэл WebP зураг сонгоорой. HEIC зургийг JPG болгож оруулна.';if(f.size>10*1024*1024)return 'Зураг 10 MB-аас бага байх хэрэгтэй.';if(f.size===0)return 'Хоосон файл байна. Өөр зураг сонгоорой.';return ''}
function profileValid(p){if(!['dog','cat'].includes(p.species))return false;const age=Number(p.age);return p.age===''||(Number.isFinite(age)&&age>=0&&age<=(p.ageUnit==='months'?360:30))}
function price(p,index){const s=p.sizes[index];return s?.price_mnt??p.price_mnt}
const api={group,species,products,reference,scene,swatch,validatePhoto,profileValid,price};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PetStudioCore=api;
})(typeof window!=='undefined'?window:globalThis);
