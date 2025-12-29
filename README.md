# TrendBuzz

TrendBuzz is a non-commercial, educational analytics project that analyzes
publicly available Reddit posts to identify trending discussion topics across
selected subreddits.

## Purpose
The purpose of this project is to help developers and learners understand how
topic popularity changes over time using aggregated public Reddit data.

## What the Application Does
- Fetches publicly available Reddit posts from selected subreddits
- Collects only post-level metadata such as:
  - Title
  - Subreddit name
  - Score (upvotes)
  - Number of comments
  - Timestamps
- Aggregates this data to calculate simple trend indicators
- Displays trends using charts and dashboards

## What the Application Does NOT Do
- Does not post, comment, vote, or message users on Reddit
- Does not access private, deleted, or restricted content
- Does not track, analyze, or profile individual users
- Does not perform AI or machine learning model training
- Does not commercialize, resell, or redistribute Reddit data

## Data Usage & Compliance
TrendBuzz strictly follows:
- Reddit Data API Terms
- Reddit Responsible Builder Policy
- Reddit Privacy Policy

All data usage is read-only, rate-limited, and used only for aggregation and
visualization purposes.

## Technology Stack (Planned)
- Backend: Node.js, Express
- Frontend: React
- Database: MongoDB / PostgreSQL (aggregated metrics only)

## Project Status
This project is under active development.
