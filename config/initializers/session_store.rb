# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_spotstock_session',
  :secret      => 'fb522506b73e9679899a7f670d7af78e21f1e2f56803b14577dd731fa272865cf2b9f3acc0c87e8cfd903a25f23b726d3a6f02c34c964f60a6f7af0108378d03'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
