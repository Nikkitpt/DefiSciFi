from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os


# Initialize extensions without tying them to any specific app yet
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the extensions with the app instance
    db.init_app(app)
    migrate.init_app(app, db)

    # Import and register blueprints after app creation to avoid circular imports
    from .routes import main
    app.register_blueprint(main)

    return app
