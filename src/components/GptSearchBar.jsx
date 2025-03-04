import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const currentLang = useSelector((store) => store.config.lang);
  console.log(currentLang);
  return (
    <div className="pt-[6%] flex justify-center ">
      <form
        className=" bg-black w-1/2 grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder={lang[currentLang].gptSearchPlaceholder}
          className="p-4 m-4 bg-white col-span-9"
        />
        <button className="py-2 px-4 rounded-lg bg-red-700 text-white col-span-3 m-4 cursor-pointer">
          {lang[currentLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
