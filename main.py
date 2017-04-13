#Autorun tools
#descript:Autorun for development
#author:Andrew
#date:2015.08.31

import os
import sys
import glob
import shutil, errno
import platform
import re
import subprocess
from subprocess import Popen, PIPE, CREATE_NEW_CONSOLE
from html.parser import HTMLParser

class Tool(object):
	def __init__(self):
		""""""
		
	def buildCommand(self, list):
		cmd = param = None
		
		if len(list[1:]) > 0:
			cmd = list[1]
			
		if len(list[2:]) > 0:
			param = {}
			pat1 = "^-"
			pat2 = "="
			for a in list[2:]:
				m = re.match(pat1, a)
				if m:
					result = re.split(pat2, a)
					key = result[0].split("-")[1]
					value = None
					if len(result) > 1:
						value = result[1]
					param[key] = value

		dictionary = {
			"cmd": cmd,
			"param": param
		}

		return dictionary
		
	'''
	return {Array} [0]: {String} Windows, Linux, Ios?
				   [1]: {Boolean} is64 true, false
	'''
	def getSysPlatform(self):
		#sys
		sys = platform.system()
		if sys == "Windows":
			sysName = "win"
		elif sys == "Linux":
			sysName = "linux"
		elif sys == "Ios":#NOT sure??
			sysName = "ios"
		
		#bit
		sysBit = "32"
		'''
		is64 = "64" in platform.machine()
		if is64:
			sysBit = "64"
		else:
			sysBit = "32"
		'''
			
		sysMode = sysName + "_" + sysBit
		
		return sysMode
		
	'''
	copy config files by server
	'''
	def copyConf(self, name = "localhost"):
		sourceDir = "./conf/"
		tagDir = "./conf/"
		files = os.listdir(sourceDir + name + "/")
		for filename in files:
			file = sourceDir + name + "/" + filename
			if os.path.isfile(file):
				shutil.copy(file, tagDir + filename)
		'''
		files = glob.glob(sourceDir)
		for filename in files:
			print filename
		'''
		
	def copyFolder(src, dst):
		try:
			shutil.copytree(src, dst)
		except OSError as exc: # python >2.5
			if exc.errno == errno.ENOTDIR:
				shutil.copy(src, dst)
			else: raise
		
	def deleFile(self, name):
		if os.path.exists(name):
			os.remove(name)
		else:
			print("Can not remove %s file." % name)
		
	def deleFolder(self, name):
		if os.path.isdir(name):
			shutil.rmtree(name, True, self.delFolderErrorHanlder)
			
	def delFolderErrorHanlder(self, func, path, exc_info):
		os.system('rmdir /S /Q \"{}\"'.format(path))
		
	def readJson(self, path, key = None):		
		with open(path) as data_file:    
			data = json.load(data_file)
		#pprint(data)
		#pprint(data[key])
		if key == None:
			return data
		elif key != None:
			return data[key]

class TheHTMLParser(HTMLParser):

	def __init__(self):
		HTMLParser.__init__(self)
		self.data = []
		
	def handle_starttag(self, tag, attrs):
		if tag == "script":
			flag = False
			src = None
			for item in attrs:
				if "data-dev" in item:
					flag = True
				elif "src" in item:
					src = item[1]
			if flag == True and src != None:
				self.data.append(src)

	def handle_endtag(self, tag):
		pass
		
	def handle_data(self, data):
		pass
	
class Run():
	def __init__(self, cmd, param = None):
		self.cmd = cmd
		if self.cmd == None:
			self.cmd = "start"
		self.param = param
		self.version = "0"
		self.app = "";
		if self.param != None and "app" in self.param:
			self.app = self.param["app"];
			
	def start(self):
		if self.cmd == "start":
			self.dev()		
		elif self.cmd == "mini":
			self.mini()
		elif self.cmd == "release":
			self.release()
		#Install dependents modules first time to develope
		elif self.cmd == "install":
			self.install()
		else :
			print("No Such Command")
	
	def dev(self):
		#Tool().copyConf()
		print(self.app)
		self.server()
		
	def server(self):
		CMD = "node " + os.path.join("tools", "server", "server.js") + " " + self.app
		# define a command that starts new terminal
		if platform.system() == "Windows":
			new_window_command = ("cmd.exe /c start " + CMD).split()
		else:  #XXX this can be made more portable
			new_window_command = ("x-terminal-emulator -e " + CMD).split()
		Popen(new_window_command)
		
	def mini(self):
		os.system("node " + os.path.join("tools", "combineJs", "app.js") + " " + self.app)
				
	def release(self):
		#Tool().copyConf("remote")
		self.mini();
		sourceDir = "./app/" + self.app + "/js/"
		tagDir = "./release/"
		filename = "toplink." + self.app +".min.js"
		file = sourceDir + "/" + filename
		if os.path.isfile(file):
			shutil.copy(file, tagDir)
						
	def install(self):
		''''''
		# Check current working directory.
		os.chdir("./tools/combineJs")
		if self.param != None and "clean" in self.param:
			Tool().deleFolder("node_modules")
		os.system("npm install")
		os.chdir("../server")
		if self.param != None and "clean" in self.param:
			Tool().deleFolder("node_modules")
		os.system("npm install")
		#print("Directory changed successfully %s" % retval)
	
def main(args = None):
	cmdDict = Tool().buildCommand(args)

	#run
	Run(cmdDict["cmd"], cmdDict["param"]).start()

if __name__ == "__main__":
	main(sys.argv);
