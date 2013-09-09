require 'bundler/capistrano'

set :default_environment, {
 :PATH => '/opt/local/bin:/opt/local/sbin:/opt/local/ruby/gems/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
 :GEM_HOME => '/opt/local/ruby/gems'
}

set :application, 'www.abcplaneta.com.br'

set :keep_releases, 3

set :scm, :git

ssh_options[:forward_agent] = true

default_run_options[:pty] = true

set :repository, 'git@github.com:arferreira/planetaabc.git'

set :branch, 'master'

set :deploy_via, :remote_cache

set :user, "root"

set :use_sudo, false

set :deploy_to, '/var/www/planetaabc'

set :current, "#{deploy_to}/current"

role :web, application
role :app, application
role :db,  application, primary: true

namespace :deploy do
  task :start do
    %w(config/database.yml).each do |path|
      from  = "#{deploy_to}/#{path}"
      to    = "#{current}/#{path}"

      run "if [ -f '#{to}' ]; then rm '#{to}'; fi; ln -s #{from} #{to}"
    end

    run "cd #{current} && RAILS_ENV=production && GEM_HOME=/opt/local/ruby/gems && bundle exec unicorn_rails -c #{deploy_to}/config/unicorn.rb -D"

  end

  task :stop do
   
    run "if [ -e /var/www/ifollow/shared/pids/unicorn.pid ]; then kill `cat /var/www/ifollow/shared/pids/unicorn.pid`; fi;"
  end

  task :restart do
    stop
    start
  end
end