("use client");
export default function AboutUs() {
  return (
    <div
      id="about-section"
      className="relative mb-10"
      style={{
        backgroundImage:
          "url('https://cdn.create.vista.com/api/media/small/384446076/stock-photo-little-boy-sits-table-books-chooses-color-pencil-drawing-home')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        opacity: ".7",
      }}
    >
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32 text-center text-white">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Empowering Minds, Shaping Futures
        </h1>
        <p className="mt-8 text-white text-base font-large sm:text-base">
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
