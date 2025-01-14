import backgroundImage from "../assets/bg.jpg";
export default function AboutUs() {
  return (
    <div id="about-section" className="relative mb-5">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover",
          opacity: 0.9,
        }}
      ></div>

      <div className="relative mx-auto max-w-2xl py-16 sm:py-24 lg:py-32 text-center text-zinc-100">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Empowering Minds, Shaping Futures
        </h1>
        <p className="mt-8 text-sm font-semibold  sm:text-lg">
          Empowering young minds for a brighter future. At Apna School, we
          inspire holistic growth, foster creativity, and nurture potential
          through a world-class curriculum, state-of-the-art facilities, and
          dedicated faculty. Together, we shape leaders ready to excel beyond
          the classroom.
        </p>
      </div>
    </div>
  );
}
