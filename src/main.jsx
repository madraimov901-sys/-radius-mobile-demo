import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";

const demoBanks = [
  {
    id: 1,
    name: "RADIUS Bank Demo",
    status: "rejected",
  },
  {
    id: 2,
    name: "Tashkent Finance Demo",
    status: "rejected",
  },
  {
    id: 3,
    name: "UzPay Credit Demo",
    status: "approved",
    limit: "15 000 000 UZS",
    term: "12 месяцев",
  },
  {
    id: 4,
    name: "Capital Finance Demo",
    status: "pending",
  },
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("seller");
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState([]);

  const [client, setClient] = useState({
    name: "",
    phone: "",
    passport: "",
    address: "",
    income: "",
  });

  function startChecking() {
    setChecking(true);
    setChecked([]);

    demoBanks.forEach((bank, index) => {
      setTimeout(() => {
        setChecked((prev) => [...prev, bank.id]);

        if (bank.status === "approved") {
          setChecking(false);
        }
      }, (index + 1) * 1000);
    });
  }

  return (
    <div className="app">

      <div className="demo-banner">
        ⚠️ DEMO MODE — тестовая система
      </div>

      <header className="header">
        <div>
          <div className="logo">RADIUS</div>
          <div className="logo-sub">MOBILE</div>
        </div>

        <div className="role">
          {role === "admin" ? "ADMIN" : "SELLER"}
        </div>
      </header>

      <main className="content">

        {page === "dashboard" && (
          <>
            <div className="welcome">
              <h1>Добро пожаловать</h1>
              <p>Корпоративная система оформления клиентов</p>
            </div>

            <div className="stats">
              <div className="stat">
                <span>Заявки</span>
                <strong>12</strong>
              </div>

              <div className="stat">
                <span>Одобрено</span>
                <strong>7</strong>
              </div>

              <div className="stat">
                <span>В обработке</span>
                <strong>3</strong>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() => setPage("application")}
            >
              + Новая заявка
            </button>

            <button
              className="secondary-button"
              onClick={() => setPage("applications")}
            >
              📋 Мои заявки
            </button>

            {role === "admin" && (
              <button
                className="secondary-button"
                onClick={() => setPage("admin")}
              >
                ⚙️ Панель администратора
              </button>
            )}
          </>
        )}

        {page === "application" && (
          <>
            <div className="page-title">
              <button onClick={() => setPage("dashboard")}>←</button>
              <div>
                <h1>Новая заявка</h1>
                <p>Анкета клиента</p>
              </div>
            </div>

            <div className="card">

              <label>ФИО клиента</label>
              <input
                placeholder="Введите ФИО"
                value={client.name}
                onChange={(e) =>
                  setClient({ ...client, name: e.target.value })
                }
              />

              <label>Телефон</label>
              <input
                placeholder="+998 90 000 00 00"
                value={client.phone}
                onChange={(e) =>
                  setClient({ ...client, phone: e.target.value })
                }
              />

              <label>Паспорт</label>
              <input
                placeholder="AA0000000"
                value={client.passport}
                onChange={(e) =>
                  setClient({ ...client, passport: e.target.value })
                }
              />

              <label>Адрес</label>
              <input
                placeholder="Адрес проживания"
                value={client.address}
                onChange={(e) =>
                  setClient({ ...client, address: e.target.value })
                }
              />

              <label>Доход</label>
              <input
                placeholder="Например: 8 000 000 UZS"
                value={client.income}
                onChange={(e) =>
                  setClient({ ...client, income: e.target.value })
                }
              />

            </div>

            <div className="card">
              <h2>Товар</h2>

              <label>Категория</label>
              <select>
                <option>Смартфон</option>
                <option>Телевизор</option>
                <option>Холодильник</option>
                <option>Стиральная машина</option>
                <option>Кондиционер</option>
                <option>Другая техника</option>
              </select>

              <label>Стоимость</label>
              <input placeholder="Например: 5 000 000 UZS" />
            </div>

            <button
              className="primary-button"
              onClick={() => setPage("checking")}
            >
              Перейти к проверке
            </button>
          </>
        )}

        {page === "checking" && (
          <>
            <div className="page-title">
              <button onClick={() => setPage("application")}>←</button>

              <div>
                <h1>Проверка заявки</h1>
                <p>Банки проверяются по приоритету</p>
              </div>
            </div>

            <div className="client-mini">
              <strong>{client.name || "Тестовый клиент"}</strong>
              <span>{client.phone || "+998 90 000 00 00"}</span>
            </div>

            {!checking && checked.length === 0 && (
              <button
                className="primary-button"
                onClick={startChecking}
              >
                🏦 Начать проверку
              </button>
            )}

            <div className="banks">

              {demoBanks.map((bank, index) => {

                const isChecked = checked.includes(bank.id);

                let statusText = "Ожидание";
                let statusClass = "waiting";

                if (isChecked && bank.status === "rejected") {
                  statusText = "Отказ";
                  statusClass = "rejected";
                }

                if (isChecked && bank.status === "approved") {
                  statusText = "Одобрено";
                  statusClass = "approved";
                }

                return (
                  <div className="bank-card" key={bank.id}>

                    <div className="bank-number">
                      {index + 1}
                    </div>

                    <div className="bank-info">
                      <strong>{bank.name}</strong>

                      {bank.status === "approved" && isChecked && (
                        <small>
                          Лимит: {bank.limit} · {bank.term}
                        </small>
                      )}

                      <span className={`status ${statusClass}`}>
                        {statusText}
                      </span>
                    </div>

                  </div>
                );
              })}

            </div>

            {checked.includes(3) && (
              <div className="success-box">
                <h2>✓ Заявка одобрена</h2>

                <p>
                  Банк: <strong>UzPay Credit Demo</strong>
                </p>

                <p>
                  Лимит: <strong>15 000 000 UZS</strong>
                </p>

                <p>
                  Срок: <strong>12 месяцев</strong>
                </p>

                <button
                  className="primary-button"
                  onClick={() => setPage("dashboard")}
                >
                  Перейти к оформлению
                </button>
              </div>
            )}

          </>
        )}

        {page === "applications" && (
          <>
            <div className="page-title">
              <button onClick={() => setPage("dashboard")}>←</button>

              <div>
                <h1>Мои заявки</h1>
                <p>История заявок продавца</p>
              </div>
            </div>

            <div className="application-card">
              <strong>RM-2026-00125</strong>
              <span>Алишер Каримов</span>
              <small>5 000 000 UZS</small>
              <b className="approved-text">Одобрено</b>
            </div>

            <div className="application-card">
              <strong>RM-2026-00124</strong>
              <span>Мухаммад Али</span>
              <small>8 500 000 UZS</small>
              <b className="rejected-text">Отказ</b>
            </div>

            <div className="application-card">
              <strong>RM-2026-00123</strong>
              <span>Саидбек Рахимов</span>
              <small>12 000 000 UZS</small>
              <b className="pending-text">В обработке</b>
            </div>
          </>
        )}

        {page === "admin" && (
          <>
            <div className="page-title">
              <button onClick={() => setPage("dashboard")}>←</button>

              <div>
                <h1>Администратор</h1>
                <p>Управление системой</p>
              </div>
            </div>

            <div className="admin-menu">

              <button>
                👥 Пользователи
              </button>

              <button>
                🏦 Партнёры
              </button>

              <button>
                🔢 Приоритет банков
              </button>

              <button>
                📋 Все заявки
              </button>

              <button>
                🏪 Филиалы
              </button>

              <button>
                📊 Отчёты
              </button>

              <button>
                🛡️ Security Center
              </button>

            </div>

            <div className="demo-note">
              В DEMO MODE все банки и результаты проверки являются
              тестовыми. Реальные кредитные данные и банковские API
              отсутствуют.
            </div>
          </>
        )}

      </main>

      <nav className="bottom-nav">

        <button onClick={() => setPage("dashboard")}>
          🏠
          <span>Главная</span>
        </button>

        <button onClick={() => setPage("application")}>
          ＋
          <span>Заявка</span>
        </button>

        <button onClick={() => setPage("applications")}>
          📋
          <span>Заявки</span>
        </button>

        <button
          onClick={() => {
            setRole(role === "seller" ? "admin" : "seller");
            setPage("dashboard");
          }}
        >
          ⚙️
          <span>{role === "seller" ? "Admin" : "Seller"}</span>
        </button>

      </nav>

    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);