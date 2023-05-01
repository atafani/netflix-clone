import type { NextPage } from "next";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineLock } from "react-icons/md";
import { SignUpFooter, SignUpHeader } from "views";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
enum PaymentType {
  Card,
}
type ChoosePayment = {
  type: PaymentType;
};

const PaymentPicker: NextPage = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-10 mb-60 flex flex-col justify-center items-center">
        <div className="w-2/3 lg:w-1/3 text-center">
          <div className="border-2 border-netflix rounded-full p-1 w-fit mb-8 mx-auto">
            <MdOutlineLock className="text-netflix text-3xl font-light" />
          </div>
          <p className="text-xl uppercase">Step 3 of 3</p>
          <h1 className="text-3xl my-2 mb-5 font-medium">Choose how to pay</h1>
          <p>
            Your paymnet is encrypted and you can change how you pay anytime.
          </p>
          <p className="font-medium">Secure for peace of mind.</p>
          <p className="font-medium">Cancel easily online.</p>
          <div
            className="flex flex-row justify-between items-center px-3 py-5 border-2 border-gray-300 rounded-md hover:cursor-pointer mt-5"
            onClick={() => router.push("/signup/creditoption")}
          >
            <div className="flex flex-row gap-3">
              <p>Credit or Debit Card</p>
              <Image
                src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png"
                alt="Visa"
                width={30}
                height={10}
              />
              <Image
                src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
                alt="Mastercard"
                width={30}
                height={10}
              />
              <Image
                src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png"
                alt="Amex"
                width={30}
                height={10}
              />
            </div>
            <IoIosArrowForward className="text-xl" />
          </div>
        </div>
      </div>
      <SignUpFooter />
    </div>
  );
};

export default PaymentPicker;
