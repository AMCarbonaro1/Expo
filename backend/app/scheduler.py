import logging

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.triggers.interval import IntervalTrigger

from app.services.nightly_pipeline import run_nightly_pipeline
from app.services.morning_send import send_morning_recaps

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


def start_scheduler():
    scheduler.add_job(
        run_nightly_pipeline,
        CronTrigger(hour=1, minute=0),
        id="nightly_pipeline",
        replace_existing=True,
    )
    # Run recap check every 15 minutes — each restaurant has its own preferred time
    scheduler.add_job(
        send_morning_recaps,
        IntervalTrigger(minutes=15),
        id="morning_recaps",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("Scheduler started: nightly at 1:00 AM, recaps every 15 min (per-restaurant)")


def shutdown_scheduler():
    scheduler.shutdown()
    logger.info("Scheduler shut down")
