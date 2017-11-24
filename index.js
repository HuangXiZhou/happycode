#! /usr/bin/env node

const translate = require('translate-api')
const program   = require('commander')
const chalk     = require('chalk')
const ora       = require('ora')

const spinner = ora()

program
  .description(chalk.green('代码变量名翻译'))
  .option('<keyword>', '翻译单词（中）')
  .option('-E, --en <keyword>', '翻译单词（英）')
  .action(keyword => {
    spinner.start(chalk.yellow('translating...')).color = 'yellow'
    translate.getText(keyword, { to: 'en' })
      .then(data => {
        spinner.stop().succeed(chalk.green(data.text))
      })
      .catch(err => {
        spinner.stop().fail(chalk.red(err.code))
      })
  })
  .on('--help', () => {
    console.log('')
    console.log(chalk.yellow('  Example:'))
    console.log('$ happycode 变量')
    console.log('$ happycode --en variable')
	})
program.parse(process.argv)

if(program.en === true) {
  spinner.start(chalk.yellow('translating...')).color = 'yellow'
  spinner.stop().fail(chalk.red('请输入参数'))
} else if(program.en) {
  spinner.start(chalk.yellow('translating...')).color = 'yellow'
  translate.getText(program.en, { to: 'zh-CN' })
    .then(data => {
      spinner.stop().succeed(chalk.green(data.text))
    })
    .catch(err => {
      spinner.stop().fail(chalk.red(err.code))
    })
}
