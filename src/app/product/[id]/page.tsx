import { describe } from "node:test";
import { title } from "process";
import React from "react";
export type ParamProps = {
  params: {
    id: number;
  };
};

async function getDetail(id: number) {
  const productDetail = await fetch(`https://dummyjson.com/products/${id}`);
  return productDetail.json();
}

export async function generateMetadata({params}: any) {
  const id = params.id
  const product = await getDetail(id);
  return {
    title: product?.title,
    describe: product.description,
    openGraph: {
      images: product.thumbnail,
    },
  }
}


async function page({ params }: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id);
  return (
    <div>
      <h1 className="font-bold text-xl">
        Product title:
        {productDetail.title}
      </h1>
    </div>
  );
}

export default page;
