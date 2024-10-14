
import { Router, Request, Response } from "express";
import { SyncAdsMixpanelController } from "../controller/sync-ads-mixpanel-controller";
import { UnsupportedAdsServiceException } from "../exceptions/unsupported-ads-service-exception";


export const buildRoutes = ({ syncAdsMixpanelController }: { syncAdsMixpanelController: SyncAdsMixpanelController }) => {

    const router = Router();

    router.get("/", (_: Request, res: Response) => { res.json({ status: "ok" }) });

    router.post("/sync/:adsService", async (req: Request, res: Response) => {
        try {

            await syncAdsMixpanelController
                .execute({
                    adsService: req.params.adsService,
                    date: req.body.date
                })

            res.json({ status: "ok" })

        } catch (error: any) {
            if (error instanceof UnsupportedAdsServiceException) {
                res.status(error.statusCode).json({ error: error.message });
                return;
            }
            console.log(`Error: ${error.message}`);
            console.log(`Error: ${error.stack}`);
            res.status(500).json({ error: "An error occurred." });
        }
    });

    router.all("*", (_: Request, res: Response) => {
        res.status(404).json({ error: "Route not found." });
    });

    return router;
}
