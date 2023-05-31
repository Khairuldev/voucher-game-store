/* eslint-disable @next/next/no-img-element */
import CheckOutDetail from "components/organisms/CheckOutDetail";
import CheckOutConfirmation from "components/organisms/CheckOutConfirmation";
import CheckOutItem from "components/organisms/CheckOutItem";
import React from "react";
import Image from "next/image";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, userTypes } from "services/data-types";

interface CheckoutPorps {
  user: userTypes;
}

export default function Checkout(props: CheckoutPorps) {
  const { user } = props;
  console.log("user :", user);

  return (
    //  <!-- Checkout Content -->
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
            <Image src={"/icon/logo.svg"} width={60} height={60} alt="" />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckOutItem />
        <hr />
        <CheckOutDetail />
        <CheckOutConfirmation />
      </div>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  console.log("payload :", payload);
  const userFromPayload: userTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
