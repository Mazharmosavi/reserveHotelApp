import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useRef } from "react";
import { useState } from "react";
import useOutsideClick from "../useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../Context/AuthContextProvider";
const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const navigator = useNavigate();

  const DateRef = useRef();
  useOutsideClick(
    DateRef,
    () => {
      setOpenDate(false);
    },
    "dateDropDown"
  );

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOption = (name, operator) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operator === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const endCodeParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigator({
      pathname: "hotels",
      search: endCodeParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type={"text"}
            placeholder={"where to go ? "}
            className="headerSearchIput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>

        <div
          className="headerSearchItem"
          id="dateDropDown"
          ref={DateRef}
          onClick={() => {
            setOpenDate(!openDate);
          }}
        >
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyyy")} To ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => {
                console.log("f");
                console.log(item);
                setDate([item.selection]);
              }}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={false}
              retainEndDateOnFirstSelection={true}
              editableDateInputs={true}
            />
          )}
          <span className="seperator"></span>
        </div>

        <div className="headerSearchItem">
          <div onClick={() => setOpenOptions(!openOption)} id="optionDropDown">
            {options.adult} adult &bull; {options.children}children &bull;{" "}
            {options.room}room
          </div>
          {openOption && (
            <GuestOptions
              id={"optionDropDown"}
              options={options}
              handleOption={handleOption}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={() => handleSearch()} className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
        <User />
      </div>
    </div>
  );
};

export default Header;

function GuestOptions({ options, handleOption, setOpenOptions, id }) {
  const optionRef = useRef();
  useOutsideClick(
    optionRef,
    () => {
      setOpenOptions(false);
    },
    id
  );
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOption={handleOption}
        options={options}
        type={"adult"}
        minLimit={1}
      />
      <OptionItem
        handleOption={handleOption}
        options={options}
        type={"children"}
        minLimit={0}
      />
      <OptionItem
        handleOption={handleOption}
        options={options}
        type={"room"}
        minLimit={1}
      />
    </div>
  );
}
function OptionItem({ options, type, minLimit, handleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOption(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
function User() {
  const { isAuthenicated, user,Logout } = useAuth();
  const handleLogout=()=>{
    Logout()
  }
  return (
    <div>
      {isAuthenicated ? (
        <div className="">
          <span>{user.name}</span>
          <button onClick={handleLogout}>
            &nbsp;<HiLogout className="icon"/>
          </button>
        </div>
      ) : (
        <NavLink to={"/Login"}>login</NavLink>
      )}
    </div>
  );
}
