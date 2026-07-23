import { useEffect, useState } from "react";
import { isConnected, getUserInfo } from "@stellar/freighter-api";

let address: string;

let addressLookup = (async () => {
  if (await isConnected()) return getUserInfo()
})();

/**
 * Returns an object containing `address` and `displayName` properties, with
 * the address fetched from Freighter's `getPublicKey` method in a
 * render-friendly way.
 *
 * Before the address is fetched, returns null.
 *
 * Caches the result so that the Freighter lookup only happens once, no matter
 * how many times this hook is called.
 *
 * NOTE: This does not update the return value if the user changes their
 * Freighter settings; they will need to refresh the page.
 */
export function useAccount(): { address: string; displayName: string } | null {
  const [, setLoading] = useState(address === undefined);

  useEffect(() => {
    if (address !== undefined) return;

    addressLookup
      .then(user => { if (user) address = user.publicKey })
      .finally(() => { setLoading(false) });
  }, []);

  if (!address) return null;

  return {
    address,
    displayName: `${address.slice(0, 4)}...${address.slice(-4)}`,
  };
}