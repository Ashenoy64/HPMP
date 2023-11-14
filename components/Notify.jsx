const [notice, setNotice] = useState("");
const [noticeActive, setNoticeActive] = useState(false);

// Function to notify user through popup
const Notify = (notice) => {
  setNotice(notice);
  setNoticeActive(true);

  setTimeout(() => {
    setNoticeActive(false);
  }, 3000);
};

<div
  className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded z-10  ${
    noticeActive ? "block" : "hidden"
  } `}
>
  {notice}
</div>

