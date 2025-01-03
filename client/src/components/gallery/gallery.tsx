import SedumBurrito from "../../assets/img/SedumBurrito.jpg";
import GoldenBarrelCactus from "../../assets/img/GoldenBarrelCactus.jpg";
import EchinocereusBrandegeei from "../../assets/img/EchinocereusBrandegeei.jpg";
import AeoniumGorgoneum from "../../assets/img/AeoniumGorgoneum.jpg";
import PilosocereusPachycladus from "../../assets/img/PilosocereusPachycladus.jpg";
import AloeVariegata from "../../assets/img/AloeVariegata.jpg";
import BunnyEarCactus from "../../assets/img/BunnyEarCactus.jpg";
import EcheveriaGoochie from "../../assets/img/EcheveriaGoochie.jpg";
import EcheveriaLimenChile from "../../assets/img/EcheveriaLimenChile.jpg";
import PachyphytumCompactumVariegata from "../../assets/img/PachyphytumCompactumVariegata.jpg";
import EcheveriaDorisTaylor from "../../assets/img/EcheveriaDorisTaylor.jpg";
import RuffledEcheveria from "../../assets/img/RuffledEcheveria.jpeg";
import SedumNussbaumerianum from "../../assets/img/SedumNussbaumerianum.jpg";
import HaworthiaFasciata from "../../assets/img/HaworthiaFasciata.jpeg";
import SedumMontanumSubspOrientale from "../../assets/img/SedumMontanumSubspOrientale.jpg";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: SedumBurrito,
    thumbnail: SedumBurrito,
  },
  {
    original: GoldenBarrelCactus,
    thumbnail: GoldenBarrelCactus,
  },
  {
    original: EchinocereusBrandegeei,
    thumbnail: EchinocereusBrandegeei,
  },
  {
    original: AeoniumGorgoneum,
    thumbnail: AeoniumGorgoneum,
  },
  {
    original: PilosocereusPachycladus,
    thumbnail: PilosocereusPachycladus,
  },
  {
    original: AloeVariegata,
    thumbnail: AloeVariegata,
  },
  {
    original: BunnyEarCactus,
    thumbnail: BunnyEarCactus,
  },
  {
    original: EcheveriaGoochie,
    thumbnail: EcheveriaGoochie,
  },
  {
    original: EcheveriaLimenChile,
    thumbnail: EcheveriaLimenChile,
  },
  {
    original: PachyphytumCompactumVariegata,
    thumbnail: PachyphytumCompactumVariegata,
  },
  {
    original: EcheveriaDorisTaylor,
    thumbnail: EcheveriaDorisTaylor,
  },
  {
    original: RuffledEcheveria,
    thumbnail: RuffledEcheveria,
  },
  {
    original: SedumNussbaumerianum,
    thumbnail: SedumNussbaumerianum,
  },
  {
    original: HaworthiaFasciata,
    thumbnail: HaworthiaFasciata,
  },
  {
    original: SedumMontanumSubspOrientale,
    thumbnail: SedumMontanumSubspOrientale,
  },
];

export const Gallery = () => {
  return (
    <section className="gallery" id="gallery">
      <ImageGallery
        items={images}
        slideDuration={700}
        slideInterval={7000}
        showBullets={true}
        flickThreshold={0.1}
        autoPlay={true}
      />
    </section>
  );
};
