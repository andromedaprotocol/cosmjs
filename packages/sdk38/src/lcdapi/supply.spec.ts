import { pendingWithoutWasmd, wasmd } from "../testutils.spec";
import { LcdClient } from "./lcdclient";
import { setupSupplyExtension } from "./supply";

describe("SupplyExtension", () => {
  describe("totalAll", () => {
    it("works", async () => {
      pendingWithoutWasmd();

      const client = LcdClient.withExtensions({ apiUrl: wasmd.endpoint }, setupSupplyExtension);
      const supply = await client.supply.totalAll();
      expect(supply).toEqual({
        height: jasmine.stringMatching(/^[0-9]+$/),
        result: [
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ucosm",
          },
          {
            amount: jasmine.stringMatching(/^[0-9]+$/),
            denom: "ustake",
          },
        ],
      });
    });
  });

  describe("total", () => {
    it("works", async () => {
      pendingWithoutWasmd();

      const client = LcdClient.withExtensions({ apiUrl: wasmd.endpoint }, setupSupplyExtension);
      const supply = await client.supply.total("ucosm");
      expect(supply).toEqual({
        height: jasmine.stringMatching(/^[0-9]+$/),
        result: jasmine.stringMatching(/^[0-9]+$/),
      });
    });
  });
});
