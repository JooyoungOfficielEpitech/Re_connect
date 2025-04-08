from setuptools import setup, find_packages

setup(
    name="re_connect",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "sqlalchemy",
        "pydantic",
        "python-jose",
        "passlib",
        "python-multipart",
        "bcrypt",
        "alembic",
        "pytest",
        "pytest-cov",
        "httpx",
    ],
) 