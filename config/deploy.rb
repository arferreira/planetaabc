require "bundler/capistrano"
require "rvm/capistrano"

set :default_shell, "/bin/bash -l"

set :application, 'www.abcplaneta.com.br'

set :keep_releases, 3

set :scm, :git

set :rvm_type, :system

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

# Minhas configurações do Unicorn
# comando para execução do unicorn
# <optinal>
set :unicorn_binary,  "bundle exec unicorn"
# caminho para o arquivo de configuração do unicorn
# <optinal>
set :unicorn_config,  "#{current}/config/unicorn.rb"
# onde será armazenado o pid do processo do unicorn
# <optinal>
set :unicorn_pid,     "#{deploy_to}/shared/pids/unicorn.pid"


# executar antes do 'deploy:update_code' o comando 'deploy.check_folders'
# do capistrano
before 'deploy:update_code' do
  deploy.check_folders
end


namespace :deploy do

  ## News methods ->
desc "Start unicorn"
  task :start, :except => { :no_release => true } do
    run "cd #{current_path} ; bundle exec unicorn_rails -c config/unicorn.rb -D"
    run "ps aux | grep unicorn_rails | head -n 1 | awk '{print $2}' > #{deploy_to}/shared/pids/unicorn.pid"
  end

  desc "Stop unicorn"
  task :stop, :except => { :no_release => true } do
    run "kill -s QUIT `cat  #{deploy_to}/shared /pids/unicorn.pid`"
  end
  
  # reinicia o serviço do unicorn
  task :restart, :roles => :app, :except => { :no_release => true } do
    # para o serviço
    stop
    # starta o serviço
    start
  end

  # verifica as pasta necessarias para o envio, e inicialização do s serviços
  # para corrigir bug que aconteceu comigo, talvez ja tenham corrigido esse erro
  desc "Creating folders necessary"
  task :check_folders do
    run "if [ ! -d '#{deploy_to}' ];then mkdir #{deploy_to}; fi"
    run "if [ ! -d '#{deploy_to}/#{version_dir}' ];then mkdir #{deploy_to}/#{version_dir}; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}' ];then mkdir #{deploy_to}/#{shared_dir}; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}/pids' ];then mkdir #{deploy_to}/#{shared_dir}/pids; fi"
    run "if [ ! -d '#{deploy_to}/#{shared_dir}/log' ];then mkdir #{deploy_to}/#{shared_dir}/log; fi"
  end
end

namespace :ruby do
  desc "Show ruby version"
  task :version do
    run "cd #{current_release} && ruby -v"
  end
  desc "List process (sla) on server"
  task :list do
    run "top"
  end
end

namespace :unicorn do
  desc "Show error log"
  task :error_log, :except => { :no_release => true } do
    run "cat #{deploy_to}/#{shared_dir}/log/unicorn.stderr.log"
  end

  desc "Show out log"
  task :out_log, :except => { :no_release => true } do
    run "cat #{deploy_to}/#{shared_dir}/log/unicorn.stdout.log"
  end
end
