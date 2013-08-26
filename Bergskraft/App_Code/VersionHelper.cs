using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;

/// <summary>
/// Summary description for VersionHelper
/// </summary>
public class VersionHelper
{
	private static System.Version version = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version;

	public static int MajorVersion { get { return version.Major; }}
	public static int MinorVersion { get { return version.Minor; } }
	public static int BuildVersion { get { return version.Build; } }
	public static int RevisionVersion { get { return version.Revision; } }

	// No construction
	private VersionHelper()
	{
	}
}
