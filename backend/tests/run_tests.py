import pytest
import sys

if __name__ == "__main__":
    # 테스트 실행
    exit_code = pytest.main(["-v", "--cov=app", "--cov-report=term-missing"])
    sys.exit(exit_code) 