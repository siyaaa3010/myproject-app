import React, { useState, useRef } from "react";
import "./GiftGallery.css";

const PHOTOS = [
  { url: "/newPhotos/1.jpg", caption: "Red T-shirt + That reaction ❤️" },
  { url: "/newPhotos/2.jpg", caption: "Kattumara thoni pola Kattazhagan unga mela Saanjaa sandhosham undallo One of my Favorite Pic 😊" },
  { url: "/newPhotos/3.jpg", caption: "Seiyatha maathavam neeyae Poiyaatha perarul neeyae Unforgettable trip moment✈️" },
  { url: "/newPhotos/4.jpg", caption: "unakku theriyama edutha first snap always special 😂" },
  { url: "/newPhotos/5.jpg", caption: "Anbae un aasappadi Needhaan en aadaiyadaa  Raavilae hey Iruttilae vaa vaa vaa... No words to say always this is in my favorite private folder🌸" },
  { url: "/newPhotos/6.jpg", caption: "Hair Heart Trend enakaagha nee pannathu chlooo😍" },
  { url: "/newPhotos/7.jpg", caption: "Inneram minnalgal Vaanodu naanum kandaal Angae nee punnagai Seithanal engiren Ennoda fav song.. This song is in your story 🐻" },
  { url: "/newPhotos/8.jpg", caption: "Black and white kannu Unna paatha colour ah maruthae Thuru pudicha kaadhal narambellam Suru surupaaga seeruthae Ava Faceu adadadadada Ava Shapeu apapapapapa Mothathula aiyayayaya..ayyiyooo Izhukuthu izhukuthu izhukuthu enna.. I fall for you every time 💘" },
  { url: "/newPhotos/9.jpg", caption: "That sweet little pose 💕" },
  { url: "/newPhotos/10.jpg", caption: "Muthamitta moochu kaatru pattu pattu kettu ponen Pakkam vanthu nirkum pothu thitamittu etti ponen 🌹" },
  { url: "/newPhotos/11.jpg", caption: "Athana Azhagayum Onnaki Moraikkura Moraipila Naan Tholanjaen Enn Kaathala Picha Kaetuthaan Kaiya Neeti Naa Alanjaen 🌙" },
  { url: "/newPhotos/12.jpg", caption: "Unna paartha uchu kotti poven Pacha pulla aaven Achu vellam nee thaanae Enna ketta kaadhal solla maatta Raja raani seetta Nenja kulukki pottanae 💫" },
  { url: "/newPhotos/13.jpg", caption: "Enaa vittutu nee mattum ice cream sapta last ah enna pakka varathukku munnadi nall 🥰" },
  { url: "/newPhotos/14.jpg", caption: "unnoda shirt + Me = My endless happiness✨" },
  { url: "/newPhotos/15.jpg", caption: "Iruvarin rasanaigal inaindhadhe illai oru kudai pidithu naam nadandhadhe illai🎁" },
  { url: "/newPhotos/16.jpg", caption: "En kaadhal solla Oru vaarthai illai En kannukkullae Ini kanavae illai💖" },
  { url: "/newPhotos/17.jpg", caption: "Nizhaaadha soozhal Nigar illaadha mudhal kaatchiyae Azhagae nee thandhaai En vaazhvaiyae 🎬" },
  { url: "/newPhotos/18.jpg", caption: "Kannil unnai alandhadhu konjam Kannai moodi rasithadhu konjam Innum enna solla anbae Theriyaamal naan thavithenae😇" },
  { url: "/newPhotos/19.jpg", caption: "Kan irandil modhi Naan vizhundhenae Kaaranam indriyae naan sirithenae En manathum yeno ennidam illai Vendiyae unnidam naan tholaithenae 💕" },
  { url: "/newPhotos/20.jpg", caption: "Ennaanatho yethaanatho onnum puriyaamalae Allaaduren unnaala naan solla theriyaamalae Annam thanni thevai illa unna pathi pesuna Atta kathi kooda vettum unna solli veesuna 🔥" },
  { url: "/newPhotos/21.jpg", caption: "saalaiyora pookkal ellaam Unnai parthu vizhugirathae Maalai nera pattaamboochi unnai parkka thudikirathae Nitham nitham unnai ninaithu Ratham ellaam kothikkirathae Unnai unnai nerungumbothu Athanai narambum vedikirathae 💑" },
  { url: "/newPhotos/22.jpg", caption: "idhazil mele paaindha en mutham idari vizhunthadhu kannaththil rendo moondro tholvi adaindhu mottu udanthadhu vegaththil🤪" },
  { url: "/newPhotos/23.jpg", caption: "Saachitanae enna saachitanae Maathitanae vazhka maathitanae.. Saachitanae enna saachitanae Maathitanae vazhka maathitanae🌺" },
  { url: "/newPhotos/24.jpg", caption: "Naan oorengum sendraalum Ennam ellaam adi unnodu thaan ulladhu Indha theeradha aaradha peraasaikku Indru naan enna per vaipadhu Neruppu illaamal pugai illaamal Oru thee ennai soozhgindrathu💌" },
  { url: "/newPhotos/25.jpg", caption: "Oh mudhal mazhai nanaithadhai polae Mudhal thunai adainthadhai polae Kuthikiren kuthikiren melae aaruyirae📸" },
  { url: "/newPhotos/26.jpg", caption: "HeHeHe semmaya irukila hairbun la 🤪🕊️" },
  { url: "/newPhotos/27.jpg", caption: "Thookathil ularal konden Thooralil virumbi nindren Thumbal vanthal un ninaivai konden Karupu vellai pookal unda Un kannil naan kanden Un kangal vandai vunnum pookal enben Un kangal vandai vunnum pookal enben🚗" },
  { url: "/newPhotos/28.jpg", caption: "Athuvum unmatha da Ahavali,atha I fall for you every time 💘" },
  { url: "/newPhotos/29.jpg", caption: "Nee enna vittu thoorama pona day... Thodarum potta kadhayai polae Endhan maalai mudigiradhae Undhan kangal paarka thaanae Enadhu kaalai vidigiradhae  Vaaram ezhu naalum unnaalae Vaanavillaai therigiradhae Unnai kaana naatkal ellaamae Karuppu vellai aagiradhae🌼" },
  { url: "/newPhotos/30.jpg", caption: "Naan mudhal mudhalaai elithiya kaadhal isai Adharkoru adhaara sruthhi nee…..💎" },
  { url: "/newPhotos/31.jpg", caption: "You & Me... En paadhai nee En paadham nee Naan pogum dhooram neeyadaa En vaanam nee En boomi nee En aadhi andham neeyadaa" },
  { url: "/newPhotos/32.jpg", caption: "A + S = Nee enadharuginil nee Idhai vida oru kavithayae kidaiyaadhae Nee enadharuginil nee Idhai vida oru punidhamum irukkaadhae🏡" },
  { url: "/newPhotos/33.jpg", caption: "Nizhal poala naanum nadai poda neeyum Thodargindra sondham nedungaala bandham Kadal vaanam kooda niram maara koodum Manam konda paasam thadam maaridaadhu Naan vaazhum vaazhvae unakkaaga thaanae Naaldhorum nenjil naan yaendhum thaenae🎉" },
  { url: "/newPhotos/34.jpg", caption: "Kiliyae… Nee pirindhaal saagiren Viragaai…un vizhiyae ketkiren Uliyae…un urasal yerkiren Unakkaai en kuraigal thorkkiren🌟 namma last ah meet pannum pothu eduthathuuuu chlooo" },
  { url: "/newPhotos/35.jpg", caption: "My fav jimikiii.. wait pantran nee vanghi thara pora next next jimikiiss kuu💛" },
  { url: "/newPhotos/36.jpg", caption: "namma first snap outfit ithu... 🌞" },
  { url: "/newPhotos/37.jpg", caption: "Little things, big love.. Ithu nee beach la rendu peru initial eluthunathu 🖤" },
  { url: "/newPhotos/38.jpg", caption: "Avanai avanai rasithu kidanthu vizhigal Veraraiyum paarkathe Avanai avanai pazhagi tholaitha ithayam Veraraiyum erkaathae Thozhanea nee poi ketaalum Kaathalae iilai solvaanae Kaalile Vizhnthu Ketaalum Poiyilae nammai kollvaanae💕" },
  { url: "/newPhotos/39.jpg", caption: "Nee save panna first snap.. This story begins in this snap so eppayum ithu ennoda fav tha📖" },
  { url: "/newPhotos/40.jpg", caption: "Unthan rasigai nanum unaken puriyavillai  Ethanai aangal kadanthu vanthen Evanaiyum pidikavillai Irubathu varudam unnai pol evanum Ennaiyum mayakavillai... alaghuu chloo nee enakku eppayum🌹" },
  { url: "/newPhotos/41.jpg", caption: "Naa save panna first snap ithu hehehe🚀" },
  { url: "/newPhotos/42.jpg", caption: "Ketkaamal ketpathenna un vaarthai Un paarvai thaanae oh En paathai naalum thedum un paatham En aasai enna enna nee pesi naan ketka vendum Engeyae inbam thunbam neethanae Unthan moochu kaatraithaan Enthan swasam ketkuthae Antha kaatrai nenjin ullil Pooti vaiththu kaaval kaapenae.." },
  { url: "/newPhotos/43.jpg", caption: "Neethanae Neethanaaae En nenjai thatum satham Azhagai udaidhen Neeyae artham" },
  { url: "/newPhotos/44.jpg", caption: "Un paarvaiyil oraayiram Kavithai naan yezhuthuven kaatril naanae Nithamum unnai ninaikiren Ninaivinaalae anaikiren" },
];

export default function GiftGallery({ onBack, onNext }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openedIndex, setOpenedIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = (i) => {
    setOpenedIndex(i);
    setActiveIndex(i);

    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="gift-root">
      <audio ref={audioRef} loop>
        <source src="/music/love2.mp3" type="audio/mpeg" />
      </audio>

      <div className="floating-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="heart">❤️</span>
        ))}
      </div>

      <div className="twinkles">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="star" />
        ))}
      </div>

      <header className="gift-header">
  <h1 className="gift-title">💖 Tap a Memory to Reveal</h1>
  <p className="gift-sub">Fullscreen romantic view ✨</p>
  
  <div className="gift-header-buttons">
    {onBack && <button className="back-btn" onClick={onBack}>← Back</button>}
    {onNext && <button className="back-btn" onClick={onNext}>Next ➡</button>}
    <button className="music-btn" onClick={toggleMusic}>
      {isPlaying ? "⏸ Pause Music" : "▶ Play Music"}
    </button>
  </div>
</header>


      <section className="gallery-grid">
        {PHOTOS.map((p, i) => (
          <div
            key={i}
            className={`gift-box ${openedIndex === i ? "opened" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="gift-lid" />
            <div
              className="gallery-thumb"
              style={{ backgroundImage: openedIndex === i ? `url(${p.url})` : "none" }}
            />
          </div>
        ))}
      </section>

      {activeIndex !== null && (
        <div className="lightbox" onClick={() => setActiveIndex(null)}>
          <img src={PHOTOS[activeIndex].url} alt="" className="lightbox-img" />
          <p className="lightbox-caption">{PHOTOS[activeIndex].caption}</p>
        </div>
      )}

      
    </div>
  );
}
