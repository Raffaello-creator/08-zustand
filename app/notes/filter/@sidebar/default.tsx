import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const tagsList = [
    "All notes",
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];

  return (
    <ul className={css.menuList}>
      {tagsList.map((item, i) => (
        <li key={i} className={css.menuItem}>
          <Link
            href={`/notes/filter/${item.split(" ")[0]}`}
            className={css.menuLink}
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}
