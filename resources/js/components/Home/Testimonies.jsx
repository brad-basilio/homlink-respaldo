import React from "react";

const TestimonyImage = ({ image, aspectRatio, className }) => (
  <div className={`relative flex ${className}`}>
    <img
      src={image}
      alt="testimony"
      className="object-cover object-center"
      style={{ aspectRatio }}
    />
  </div>
);

const Testimonies = () => {
  return (
    <section className="grid md:grid-cols-5 gap-8 bg-amber-400">
      <div className="col-span-2 w-full flex items-center justify-center">
        <div className={`relative flex grow`}>
          <img
            src={'https://cdn.builder.io/api/v1/image/assets/TEMP/56c54c29ec1910aadaef0eb4659f772f18ec26150c604d776e293cbeb6d0d73a?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731'}
            alt="testimony"
            className="object-contain object-center w-full"
            style={{ aspectRatio: 1.125 }}
          />
        </div>
      </div>

      <div className="col-span-3 p-[5%] w-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center max-w-full">
          <div className="text-2xl font-semibold tracking-tight leading-snug text-gray-900">
            Lo que dicen nuestros alumnos
          </div>
          <div className="mt-2 text-sm leading-5 text-center text-gray-700">
            Sed condimentum leo lacus, in maximus dui pulvinar vel. Curabitur
            est leo, ac, feugiat commodo orci. Phasellus sed sapien urna.
          </div>
        </div>

        <div className="self-stretch mt-8 text-4xl font-medium tracking-tighter leading-10 text-center text-pink-600">
          Nunc dapibus hendrerit neque, tempor consequat nulla malesuada quis.{" "}
          <span className="font-semibold">Suspendisse pretium</span> pharetra
          mi, a porttitor tellus varius vitae.
        </div>

        <div className="flex flex-col mt-8 w-64 max-w-full">
          <div className="text-base font-semibold leading-6 text-center text-gray-900">
            <span className="text-pink-600">Alejandra Neyra,</span>{" "}
            <span>Lima - Perú</span>
          </div>

          <div className="flex gap-8 items-center mt-16 max-md:mt-10">
            <TestimonyImage
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/08dd36ede6e779ba0fa3354ea2dbdbde96e19c583251e93923393cf62cf4293c?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
              aspectRatio={1}
              className="w-[72px]"
            />
            <TestimonyImage
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/02ace234f9a6f645de29ed2cae12a6b580a053c63d28a5a4a295c18779d67b6e?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
              aspectRatio={1}
              className="w-[60px]"
            />
            <TestimonyImage
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/0bc41c3afc761ff00a5050feba2f2a6263a1f7cf2c1dd8951a98411edea641f9?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
              aspectRatio={1}
              className="w-[60px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonies;
