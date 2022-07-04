import { FunctionComponent, useEffect, useState } from "react";
import { IAlert } from "../../interfaces/app.interface";
import { uid } from "uid";
import classNames from "classnames";

export const Alert: FunctionComponent = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    window.bus.subscribe("alert", (e: any) => {
      const id = uid();
      const { type, message } = e;
      setAlerts((prev) => [...prev, { type, message, uid: id }]);
      setTimeout(() => {
        setAlerts(alerts.filter((alert) => alert.uid !== id));
      }, 5000);
    });
  }, []);

  return (
    <>
      {alerts &&
        alerts.map((alert) => (
          <div
            key={alert.uid}
            className="fixed bottom-3 w-full max-w-3xl flex justify-center align-center left-1/2 transform -translate-x-1/2"
          >
            <div
              role="alert"
              className={`${classNames({
                "text-red-500": alert.type == "error",
                "text-green-500": alert.type == "success",
              })} bg-gray-800 text-center py-4 px-8 w-full shadow-lg flex justify-center items-center`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="mr-2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 10.9794C11 10.4271 11.4477 9.97937 12 9.97937C12.5523 9.97937 13 10.4271 13 10.9794V16.9794C13 17.5317 12.5523 17.9794 12 17.9794C11.4477 17.9794 11 17.5317 11 16.9794V10.9794Z"
                  fill="currentColor"
                />
                <path
                  d="M12 6.05115C11.4477 6.05115 11 6.49886 11 7.05115C11 7.60343 11.4477 8.05115 12 8.05115C12.5523 8.05115 13 7.60343 13 7.05115C13 6.49886 12.5523 6.05115 12 6.05115Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                  fill="currentColor"
                />
              </svg>
              {alert.message}
            </div>
          </div>
        ))}
    </>
  );
};