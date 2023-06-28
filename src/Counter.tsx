import { Expando, useIdentity, useQuery, useSpaces } from "@dxos/react-client";
import React, { useEffect } from "react";

export const Counter = () => {
  // Get the user to log in before a space can be obtained.
  const identity = useIdentity();
  // Get the first available space, created with the identity.
  const [space] = useSpaces();
  const [counter] = useQuery(space, { type: "counter" });

  useEffect(() => {
    if (space && !counter) {
      const counter = new Expando({ type: "counter", values: [] });
      space.db.add(counter);
    }
  }, [space, counter]);

  return (
    <div>
      {counter && (
        <div className="text-center">
          <button
            className="border bg-white py-2 px-4 rounded"
            onClick={() => {
              counter.values.push(1);
            }}
          >
            Click me
          </button>
          <p>Clicked {counter.values.length ?? 0} times.</p>
        </div>
      )}
    </div>
  );
};
