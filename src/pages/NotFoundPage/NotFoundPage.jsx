import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сторінка не знайдена</h1>
      <p className={styles.message}>
        Вибачте, але сторінка, яку ви шукаєте, не існує.
      </p>
      <Link to="/">
        <button className={styles.button}>
          Повернутися на головну сторінку
        </button>
      </Link>
    </div>
  );
}
  