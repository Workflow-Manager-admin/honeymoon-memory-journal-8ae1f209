#!/bin/bash
cd /home/kavia/workspace/code-generation/honeymoon-memory-journal-8ae1f209/backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

