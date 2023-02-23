import { useFormContext, get } from "react-hook-form";
import clsx from "clsx";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({
  name,
  rules = {},
  placeholder = "Cari...",
  input = {},
  defaultValue,
  className,
}) => {
  const { register, formState } = useFormContext();
  const errors = get(formState.errors, name);

  return (
    <div className={className}>
      <div id="input-search" className="relative text-sm leading-[16px]">
        <SearchIcon
          className="absolute left-[12px] top-1/2 -translate-y-1/2 text-black-70"
          size="16px"
        />
        <input
          className={clsx(
            "peer w-full rounded-[5px] py-[7px] pr-[11px] pl-[38px] appearance-none outline-2 outline-transparent outline-offset-2 bg-white border border-black-60 focus:bg-white focus:outline-none hover:border-main-green focus:border-main-green",
            errors && "border-red"
          )}
          id={name}
          {...register(name, rules)}
          type="search"
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...input}
        />
        <input type="submit" className="hidden" />
      </div>
      {errors ? (
        <small className="block text-red text-[8px] tracking-wide ml-3">
          {errors?.message}
        </small>
      ) : null}
    </div>
  );
};

export default Search;
