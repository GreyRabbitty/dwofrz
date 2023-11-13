import { Button, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import CustomTitle from "../../../components/Pandora/CustomTitle";
import {
  editPrice,
  openPandora,
  setupPandora,
} from "../../../components/programs/solana/pandora/calls";

// icons
import { AiFillEdit } from "react-icons/ai";

const PandoraAdmin = () => {
  const wallet = useWallet();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // Form submit here
  const setUpFormSubmit = async (data) => {
    await setupPandora(
      wallet,
      data.collectionsName,
      data.collectionLimit,
      data.MintPrice,
      data.candyMachineID
    );
  };

  // console.log(wallet);

  const handleDateChange = (date) => {
    setValue("MintDate", date, { shouldValidate: true });
  };

  const thumbs = files.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      alt=""
      className="w-full h-full object-cover object-center"
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
      <Head>
        <title>Dworfz | Pandora - Admin</title>
        <link rel="rel" href="/favicon.ico" />
      </Head>

      <div className="h-screen w-screen flex justify-center items-start">
        <div className="max-w-2xl lgg:max-w-3xl w-full bg-cusEL-100 rounded-xl px-4 lgg:px-8 pt-4 mt-20 pb-24 md:pb-4">
          <div className="mx-auto w-fit">
            <CustomTitle>Admin Dashboard</CustomTitle>
          </div>
          <form onSubmit={handleSubmit(setUpFormSubmit)}>
            <div className="grid grid-cols-1 xsm:grid-cols-7 gap-10 mt-6 lgg:mt-10 scale-95 2xl:scale-100">
              <div className="xsm:col-span-4 order-2 xsm:order-1">
                <TextField
                  label="Collection name"
                  {...register("collectionsName", {
                    required: true,
                  })}
                  variant="outlined"
                  classes={{
                    root: "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                  }}
                  error={errors.collectionsName ? true : false}
                />
                <TextField
                  label="Candy machine ID"
                  {...register("candyMachineID", {
                    required: true,
                  })}
                  variant="outlined"
                  className="mt-5"
                  error={errors.candyMachineID ? true : false}
                  classes={{
                    root: "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                  }}
                />
                <TextField
                  label="Collection limit"
                  {...register("CollectionLimit", {
                    required: true,
                  })}
                  variant="outlined"
                  type="number"
                  className="mt-5"
                  error={errors.CollectionLimit ? true : false}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  classes={{
                    root: "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                  }}
                />
                <DatePicker
                  label="Mint date"
                  {...register("MintDate", {
                    required: true,
                  })}
                  onChange={handleDateChange}
                  variant="outlined"
                  className="mt-5"
                  error={errors.MintDate ? true : false}
                  slotProps={{
                    textField: {
                      className:
                        "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                    },
                    openPickerIcon: { className: "text-gray-400" },
                  }}
                />
                <TextField
                  label="Mint price"
                  {...register("MintPrice", {
                    required: true,
                  })}
                  variant="outlined"
                  className="mt-5"
                  error={errors.MintPrice ? true : false}
                  type="number"
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  classes={{
                    root: "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                  }}
                />
                <TextField
                  label="Owner address (e.g 0x7D..4Eb)"
                  {...register("OwnerAddress", {
                    required: true,
                  })}
                  variant="outlined"
                  className="mt-5"
                  error={errors.OwnerAddress ? true : false}
                  classes={{
                    root: "bg-cusEL-200 rounded-lg focus:[&>*>*]:text-white [&>*]:text-gray-400 [&>div>*]:text-sm mdd:[&>div>*]:text-base w-full",
                  }}
                />
              </div>

              <div className="xsm:col-span-3 order-1 xsm:order-2">
                {thumbs.length > 0 && thumbs[0] ? (
                  <div className="w-full h-[240px] bg-cusEL-200 overflow-hidden rounded-lg relative group">
                    {thumbs}

                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="absolute inset-0 z-10 justify-center items-center bg-cusEL-200/60 hidden group-hover:flex"
                    >
                      <input {...getInputProps()} />
                      <IconButton
                        className="text-white text-3xl"
                        aria-label="add an alarm"
                      >
                        <AiFillEdit />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="w-full min-h-[240px] bg-cusEL-200 hover:bg-[#383b43] rounded-lg flex justify-center items-center border hover:border-2 border-dashed border-cusYellow"
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-300 text-sm select-none text-center">
                      Choose a file <br /> Or drag & drop here
                    </p>
                  </div>
                )}

                <h3 className="text-white text-lg lgg:text-xl font-semibold mt-2 text-center">
                  Preview Image
                </h3>
              </div>
            </div>

            <div className="text-center mt-6 lgg:mt-10 w-full">
              <Button
                type="submit"
                className="px-8 llg:px-10 xsm:w-fit w-full mx-auto customStylesButton2"
              >
                Set Up
              </Button>
              <button
                onClick={() =>
                  openPandora(
                    "BaRhmb46dMwZRY9QcDKAmY6d5oYQKk372ZqEP4znkgM1",
                    wallet,
                    1684519411
                  )
                }
                className="px-8 llg:px-10 xsm:w-fit w-full mx-auto customStylesButton2"
              >
                Open Pandora
              </button>
              <button
                onClick={() =>
                  editPrice(
                    "BaRhmb46dMwZRY9QcDKAmY6d5oYQKk372ZqEP4znkgM1",
                    wallet,
                    50000
                  )
                }
                className="px-8 llg:px-10 xsm:w-fit w-full mx-auto customStylesButton2"
              >
                Edit Pandora
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PandoraAdmin;
