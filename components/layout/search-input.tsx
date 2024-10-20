"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "lib/utils";
import useVoice from "../../hooks/useVoice";
import { BsFillMicFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";

export const SearchInput = () => {
  const { listen, isListening, text, voiceSupported } = useVoice();
  const queryRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (text && formRef.current && !isListening) {
      queryRef.current = text;
      if (inputRef.current) {
        inputRef.current.value = text;
      }
      setTimeout(() => {
        formRef?.current?.submit();
      }, 100);
    }
  }, [isListening, text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    queryRef.current = e.target.value;
  };

  return (
    <>
      <form ref={formRef} className="flex w-full items-center" action="/search" method="GET">
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <IoIosSearch className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="search"
            name="q"
            ref={inputRef}
            onChange={handleChange}
            className="block w-full rounded-lg bg-input-background p-1 px-10 placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            placeholder="Search"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3  text-muted-foreground hover:text-primary focus:outline-none"
            disabled={!voiceSupported}
            onClick={listen}
          >
            <BsFillMicFill
              className={cn("h-4 w-4", {
                "animate-pulse": isListening,
                "text-red-700": isListening
              })}
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
