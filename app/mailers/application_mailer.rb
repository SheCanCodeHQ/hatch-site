class ApplicationMailer < ActionMailer::Base
  default from: ENV["RAILS_MAILER_FROM"] || "team@hatchlondon.io"
  layout "mailer"
end